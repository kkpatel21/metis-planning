import express from "express";
import User from "../models/user";
import Event from "../models/event";
import path from "path";
import mongoose from "mongoose";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import multer from "multer";
var storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../build/images"),
  filename: function(req, file, cb) {
    // console.log(file);
    cb(null, Date.now() + "_" + file.originalname);
  }
});
var upload = multer({ storage: storage });
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (io, store) => {
  // This function gets us the user ID that has just logged in to the server
  io.use((socket, next) => {
    let cookies;
    if (socket.request.headers.cookie) {
      cookies = cookie.parse(socket.request.headers.cookie);
      cookies = cookieParser.signedCookies(cookies, process.env.SECRET);
      let sid = cookies["connect.sid"];
      store.get(sid, (err, session) => {
        if (!err) {
          delete session.cookie;
          socket.session = session;
          next();
        } else {
          next(err);
        }
      });
    } else {
      next(new Error("No cookie transmitted"));
    }
  });

  //All socket calls should be within here
  io.on("connection", function(socket) {
    // This is to get the user.id: socket.session.passport.user

    // Res works with Next, and the first parameter works with the second parameter.
    if (socket.session.passport.user) {
      socket.emit('loggedIn')
    }

    socket.on("fetchEvents", next => {
      User.findById(socket.session.passport.user).then(user => {
        console.log(user)
        Event.find({}, (err, events) => {
          let filtered = [];
          events.forEach(event => {
            if (event.collaborators.length > 0) {
              event.collaborators.forEach(collaborator => {
                if (collaborator.email === user.email) {
                  filtered.push(event);
                }
              });
            }
            if (event.owner === user.id) {
              filtered.push(event);
            }
          });
          next({ err, filtered });
        });
      });
    });

    //In OverView
    socket.on('getEventInfo', (data) => {
      Event.findById(data.eventId, (err, event) => {
        User.findById(event.owner, (err, user) => {
          io.to(data.eventId).emit('getEvent', {
            event: event,
            user: user.firstname.substring(0, 1)
          })
        })

      })
    })


    //In EditEventModal
    socket.on('getEventInfoInside', (data) => {
      Event.findById(data.eventId, (err, event) => {

        io.to(data.eventId).emit('getEventInside', {
          event: event,
        })

      })
    })

    socket.on('getName', next => {
      User.findById(socket.session.passport.user).then(user => {
        let name = user.firstname
        io.emit('getName', {name: name});
        next({err, name})
      })
    })

    socket.on('getNameBack', next => {
      User.findById(socket.session.passport.user).then(user => {
        let name = user.firstname
        io.emit('getNameBack', {name: name});
        next({err, name})
      })
    })

    //deletes events
    socket.on("deleteEvent", (data, next) => {
      Event.findByIdAndRemove(data.id, (err, event) => {
        //makes everyone on the server to re-render
        io.emit("fetchEvents");
        next({ err, event });
      });
    });

    //open event and join event channel
    socket.on("joinRoom", (data, next) => {
      socket.join(data.eventId);
      next({ success: "Joined" });
    });

    //get people
    socket.on("getPeople", data => {
      Event.findById(data.eventId, (err, event) => {
        io.to(data.eventId).emit("sendPeople", {
          guestList: event.people,
          catererList: event.caterers,
          collaboratorList: event.collaborators
        });
      });
    });

    //get fundraising Tabs
    socket.on("getTabs", data => {
      Event.findById(data.eventId, (err, event) => {
        io.to(data.eventId).emit("sendTabs", { tabs: event.fundraising });
      });
    });

    //get logistics tabs
    socket.on('getLogisticsTabs', data => {
      Event.findById(data.eventId, (err, event) => {
        io.to(data.eventId).emit('sendLogisticsTabs', {tabs: event.allLogistics})
      })
    })

    //update guestList
    socket.on("savePeople", data => {
      Event.findById(data.eventId, (err, event) => {
        let guestList = event.people.slice();
        guestList[data.index] = data.updateInvitee;
        event.people = guestList.slice();
        event.markModified("people");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedPeople", { guestList: guestList });
        });
      });
    });

    //update catererList
    socket.on("saveCaterer", data => {
      Event.findById(data.eventId, (err, event) => {
        let catererList = event.caterers.slice();
        catererList[data.index] = data.updateCaterer;
        event.caterers = catererList.slice();
        event.markModified("caterers");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedCaterer", {
            catererList: catererList
          });
        });
      });
    });

    //update collaborator
    socket.on("saveCollab", data => {
      Event.findById(data.eventId, (err, event) => {
        let collabList = event.collaborators.slice();
        collabList[data.index] = data.updateCollaborator;
        event.collaborators = collabList.slice();
        event.markModified("collaborators");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedTeam", {
            team: eve.collaborators
          });
        });
      });
    });

    //add guests
    socket.on("addInvitee", data => {
      Event.findById(data.eventId, (err, event) => {
        event.people.push(data.newInvitee);
        event.markModified("people");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedPeople", { guestList: eve.people });
        });
      });
    });

    //add caterers
    socket.on("addCaterer", data => {
      Event.findById(data.eventId, (err, event) => {
        event.caterers.push(data.newCaterer);
        event.markModified("caterers");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedCaterer", {
            catererList: eve.caterers
          });
        });
      });
    });

    //add tab
    socket.on("addTab", data => {
      Event.findById(data.eventId, (err, event) => {
        event.fundraising.push({
          title: data.title,
          data: [],
          goal: data.goal
        });
        event.markModified("fundraising");
        event.save((err, eve) => {
          io.to(data.eventId).emit("addTab", {
            newTab: { title: data.title, data: [], goal: data.goal }
          });
        });
      });
    });

    //add logistics tab
    socket.on('addLogisticsTab', data => {
      Event.findById(data.eventId, (err, event) => {
        let v;
        event.allLogistics.push({
          title: data.title,
          data: [],
          vORp: data.vORp
        })
        event.markModified('allLogistics')
        event.save((err, eve) => {
          io.to(data.eventId).emit('addLogisticsTab', {
            newTab: { title: data.title, data: [], vORp: data.vORp}
          })
        })
      })
    })

    //edit tab
    socket.on('editTab', data => {
      Event.findById(data.eventId, (err, event) => {
        event.fundraising[data.index] = {title: data.title, data: event.fundraising[data.index].data, goal: data.goal}
        event.markModified('fundraising');
        event.save((err, eve) => {
          io.to(data.eventId).emit('sendTabs', {tabs: event.fundraising})
        })
      })
    })

    socket.on("addCollaborator", data => {
      Event.findById(data.eventId, (err, event) => {
        event.collaborators.push(data.collaborator);
        event.markModified("collaborators");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedTeam", {
            team: eve.collaborators
          });
        });
      });
    });

    //delete Tabs
    socket.on("deleteTab", data => {
      Event.findById(data.eventId, (err, event) => {
        let fundraisers = event.fundraising.slice();
        fundraisers.splice(data.index, 1);
        event.fundraising = fundraisers.slice();
        event.markModified("fundraising");
        event.save((err, eve) => {
          io.to(data.eventId).emit("sendTabs", { tabs: event.fundraising });
        });
      });
    });

    //delete Fundraising Tabs
    socket.on("deleteLogisticsTab", data => {
      Event.findById(data.eventId, (err, event) => {
        let logistics = event.allLogistics.slice();
        logistics.splice(data.index, 1)
        event.allLogistics = logistics.slice();
        event.markModified('allLogistics')
        event.save((err, eve) => {
          io.to(data.eventId).emit('sendLogisticsTabs', { tabs: event.allLogistics})
        })
      });
    });

    //delete guests
    socket.on("deleteInvitee", data => {
      Event.findById(data.eventId, (err, event) => {
        event.people.splice(data.index, 1);
        event.markModified("people");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedPeople", { guestList: eve.people });
        });
      });
    });

    //delete Caterer
    socket.on("deleteCaterer", data => {
      Event.findById(data.eventId, (err, event) => {
        event.caterers.splice(data.index, 1);
        event.markModified("caterers");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedCaterer", {
            catererList: eve.caterers
          });
        });
      });
    });

    //delete Collaborator
    socket.on("deleteCollaborator", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.collaborators.splice(data.index, 1);
        event.markModified("collaborators");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedTeam", {
            team: eve.collaborators
          });
        });
      });
    });

    //sendOneEmail
    socket.on("sendEmail", data => {
      User.findById(socket.session.passport.user, (err, user) => {
        let msg = {
          to: data.to,
          from: user.email,
          subject: data.subject,
          text: data.message
        };
        sgMail.send(msg).then(() => {
          next({ success: "Email Sent" });
        });
      });
    });

    socket.on("sendMultipleEmail", data => {
      User.findById(socket.session.passport.user, (err, user) => {
        let msg = {
          to: data.to,
          from: user.email,
          subject: data.subject,
          text: data.message
        };
        sgMail.sendMultiple(msg).then(() => {
          next({ success: "Email Sent" });
        });
      });
    });

    var userId = socket.session.passport.user;
    //Saving Ideation - Array of Objects{topic: "someTopic", user:"writer's name", notes:[comments]}
    socket.on("addIdeation", (data, next) => {
      User.findById(socket.session.passport.user).then(user => {
        Event.findById(data.id, (err, event) => {
          if (event) {
            event.ideation.push({
              topic: data.topic,
              note: []
            });
            event.markModified("ideation");
            event.save((err, event) => {
              next({ err, event });
            });
          } else if (err) {
            next({ err });
          }
        });
      });
    });

    //Getting Ideation to render
    socket.on("getIdeation", (data, next) => {
      Event.findById(data.id, (err, event) => {
        next({ err, event });
      });
    });

    //Adding Comments to Ideation
    socket.on("addComment", (data, next) => {
      User.findById(userId)
        .then(user => {
          Event.findById(data.id, (err, event) => {
            if (event) {
              event.ideation.map(ideationObj => {
                if (ideationObj.topic === data.topic.topic) {
                  return (ideationObj.note = ideationObj.note.concat({
                    comment: data.typing,
                    user: user.firstname
                  }));
                }
              });
              event.markModified("ideation");
              event.save((err, event) => {
                next({ err, event });
              });
            } else if (err) {
              next({ err });
            }
          });
        })
        .catch(err => {
          next({ err });
        });
    });

    //save comment
    socket.on('saveComment', (data, next) => {
      Event.findById(data.id, (err, event) => {
        if (event) {
          event.ideation[data.topicI].note[data.commentI].comment = data.comment
          event.markModified('ideation')
          event.save((err, event) => {
            console.log(event)
            next({ err, event})
          })
        }
      })
    })

    //Deleting topic
    socket.on("deleteIdeation", (data, next) => {
      Event.findById(data.id, (err, event) => {
        if (event) {
          event.ideation = event.ideation.filter(ideationObj => {
            return ideationObj.topic !== data.topic;
          });
          event.save((err, event) => {
            next({ err, event });
          });
        }
      });
    });

    //editing topic
    socket.on("editIdeation", (data, next) => {
      Event.findById(data.id, (err, event) => {
        if (event) {
          event.ideation.map(ideationObj => {
            if (ideationObj.topic === data.topic) {
              ideationObj.topic = data.newTopic;
            }
          });
          event.markModified("ideation");
          event.save((err, event) => {
            next({ err, event });
          });
        } else if (err) {
          next({ err });
        }
      });
    });

    //renderVenue
    // socket.on("renderVenue", (data, next) => {
    //   Event.findById(data.id, (err, event) => {
    //     if (event) {
    //       let index = data.index
    //       next({ err, event, index });
    //     } else {
    //       next({ err });
    //     }
    //   });
    // });

    //goHome
    socket.on("goHome", next => {
      io.emit("goingHome");
    });

    //load db budget information
    socket.on("getBudget", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        io.to(data.eventId).emit("updatedBudget", { budget: event.budget });
      });
    });

    //add line item to budget page
    socket.on("addLineItem", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.budget.budgetItems.push(data.budgetItems);
        event.markModified("budget");
        event.save((err, event) => {
          io.to(data.eventId).emit("updatedBudget", { budget: event.budget });
        });
      });
    });

    //add food item to food page
    socket.on("addFoodItem", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.allLogistics.budgetItems.push(data.budgetItems);
        event.markModified("allLogistics");
        event.save((err, event) => {
        });
      });
    });

    //update total budget
    socket.on('updateTotalBudget', (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.budget.total = data.totalBudget;
        event.markModified("budget");
        event.save((err, event) => {
          io.to(data.eventId).emit("updatedBudget", { budget: event.budget });
        });
      });
    });

    //save total budget approval status
    socket.on("totalApproval", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.budget.totalApproval = data.totalApproval;
        event.markModified("budget");
        event.save((err, event) => {
          io.to(data.eventId).emit("updatedBudget", { budget: event.budget });
        });
      });
    });

    //update budget list Item
    socket.on("updateLineItem", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.budget.budgetItems[data.i] = data.updateLineItem;
        event.markModified("budget");
        event.save((err, event) => {
          io.to(data.eventId).emit("updatedBudget", { budget: event.budget });
        });
      });
    });

    //delete budget list Item
    socket.on("deleteLineItem", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.budget.budgetItems.splice(data.index, 1);
        event.markModified("budget");
        event.save((err, event) => {
          io.to(data.eventId).emit("updatedBudget", { budget: event.budget });
        });
      });
    });

    //add Fundraising List
    socket.on("addToFund", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.fundraising[data.index].data.push(data.addingItem);
        event.markModified("fundraising");
        event.save((err, event) => {
          io.to(data.eventId).emit("updatedFundraiser", {
            updatedList: event.fundraising[data.index]
          });
        });
      });
    });

    //get Venue List
    socket.on('getVenue', (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        io.to(data.eventId).emit('updatedLogistics', {
          updatedLogistics: event.allLogistics[data.index]
        })
        event.allLogistics[data.index]
      })
    })

    //get Food List
    socket.on("getFood", (data,next) => {
      Event.findById(data.eventId, (err,event) => {
        io.to(data.eventId).emit('updatedFood', {
          updatedFood: event.allLogistics[data.index]
        })
        // event.allLogistics[data.index]
      })
    })

    //add Venue List
    socket.on('addVenue', (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.allLogistics[data.index].data.push(data.venueData);
        event.markModified('allLogistics');
        event.save((err, event) => {
          io.to(data.eventId).emit('updatedLogistics', {
            updatedLogistics: event.allLogistics[data.index]
          })
        })
      })
    })

    socket.on("addFoodOptions", (data,next) => {
      Event.findById(data.eventId, (err, event) => {
        event.allLogistics[data.index].data[data.i].option.push(data.foodItem);
        event.markModified('allLogistics');
        event.save((err, event) => {
          io.to(data.eventId).emit('updatedFoodOptions', {
            updatedFood: event.allLogistics[data.index],
            optionIndex: data.i,
            objIndex: data.index
          })
        })
      })
    })

    //add Catering List
    socket.on("addFood", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        if(event){
          console.log("Should contain caterer's info",data)
          event.allLogistics[data.index].data.push(data.foodData);
          event.markModified("allLogistics");
          event.save((err,event) => {
            io.to(data.eventId).emit("updatedFood", {
              updatedFood: event.allLogistics[data.index]
            })
          })
        }

      })
    })

    //delete Fundraising
    socket.on("deleteFund", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.fundraising[data.index].data.splice(data.i, 1);
        event.markModified("fundraising");
        event.save((err, event) => {
          io.to(data.eventId).emit("updatedFundraiser", {
            updatedList: event.fundraising[data.index]
          });
        });
      });
    });

    //save fundraising
    socket.on("saveFund", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        event.fundraising[data.index].data[data.i] = data.updateFund;
        event.markModified("fundraising");
        event.save((err, event) => {
          io.to(data.eventId).emit("updatedFundraiser", {
            updatedList: event.fundraising[data.index]
          });
        });
      });
    });


    //get Fundraising
    socket.on("getFundraiser", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        io.to(data.eventId).emit("updatedFundraiser", {
          updatedList: event.fundraising[data.index]
        });
      });
    });

    //deleting comment
    socket.on("deleteComment", (data, next) => {
      Event.findById(data.id, (err, event) => {
        if (event) {
          var copy = event.ideation[data.topicI].note.slice();
          copy.splice(data.commentI, 1);
          event.ideation[data.topicI].note = copy;
          event.markModified("ideation");
          event.save((err, event) => {
            next({ err, event });
          });
        }
      });
    });

    // deleteVenue
    socket.on("deleteVenue", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        if (event) {
          var logCopy = event.allLogistics[data.index].data.slice()
          logCopy.splice(data.i, 1);
          event.allLogistics[data.index].data = logCopy
          event.markModified("allLogistics");
          event.save((err, event) => {
            io.to(data.eventId).emit('updatedLogistics', {
              updatedLogistics: event.allLogistics[data.index]
            })
          });
        }
      });
    });

    //deleteFood
    socket.on("deleteFood", (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        if (event) {
          var logCopy = event.allLogistics[data.index].data.slice()
          logCopy.splice(data.i, 1);
          event.allLogistics[data.index].data = logCopy
          event.markModified("allLogistics");
          event.save((err, event) => {
            io.to(data.eventId).emit('updatedFood', {
              updatedFood: event.allLogistics[data.index]
            })
          });
        }
      });
    })

    // editVenue
    socket.on('editVenue', (data, next) => {
      Event.findById(data.eventId, (err, event) => {
        if (event) {
          event.allLogistics[data.tabIndex].data[data.index] = data.venue
          event.markModified('allLogistics')
          event.save((err, event) => {
            io.to(data.eventId).emit('updatedLogistics', {
              updatedLogistics: event.allLogistics[data.tabIndex]
            })
          })
        }
      })
    })
  });
};
