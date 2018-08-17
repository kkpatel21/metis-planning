import React, { Component } from "react";
import {
  Table,
  Menu,
  Dropdown,
  Input,
  Label,
  Progress,
  Header,
  Icon,
  Divider,
  Button,
  Segment
} from "semantic-ui-react";
import AddPeopleModal from "../../Modals/AddPeopleModal";
import EditFoodModal from "../../Modals/EditFoodModal";

export default class Food extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      price: 0,
      quantity: 0,
      option: "",
      pricePerPerson: 0
    };
  }

  componentDidMount = () => {
    this.props.socket.emit("getFood", {
      eventId: this.props.eventId,
      index: this.props.tabIndex
    });
    this.props.socket.on("updatedFood", data => {
      this.setState({ data: data.updatedFood.data });
    });
  };

  onDelete = index => {
    this.props.socket.emit("deleteFood", {
      eventId: this.props.eventId,
      index: this.props.tabIndex,
      i: index
    });
  };

  onClick = async index => {
    // if (this.state.amount === "") {
    //   await this.setState({ amount: 0 });
    // }
    let foodItem = {
      price: this.state.price,
      quantity: this.state.quantity,
      option: this.state.option,
      pricePerPerson: this.state.pricePerPerson
    };
    console.log(foodItem);
    this.props.socket.emit("addFoodOptions", {
      eventId: this.props.eventId,
      foodItem: foodItem,
      i: index,
      index: this.props.tabIndex
    });
    this.setState({
      option: "",
      price: 0,
      quantity: 0,
      pricePerPerson: 0
    });
  };

  render() {
    let optionsRender=[];


    this.state.data.map((item) => {
        item.option.forEach((option, optionIndex)=> {
            optionsRender.push(
                <Table.Row>
                    <Table.Cell>{option.option}</Table.Cell>
                    <Table.Cell>${option.price}</Table.Cell>
                    <Table.Cell>{option.quantity}</Table.Cell>
                    <Table.Cell>
                    ${option.price / option.quantity}
                    </Table.Cell>
                                {/* <Table.Cell>
                                        <span>
                                      <UpdateBudgetLineItemModal
                                        socket={this.props.socket}
                                        lineItem={item}
                                        i={index}
                                        eventId={this.props.eventId}
                                      />
                                      <Icon
                                        name="trash"
                                        onClick={() => this.deleteLineItem(index)}
                                      />
                                    </span>
                                  </Table.Cell> */}
                </Table.Row>
            )
        });
      })

    return (
      <div>
        <div>
          <Header as="h1">{this.props.title}</Header>
          <Divider />
        </div>
        {this.state.data.map((oneFood, foodI) => (
          <div>
            <Segment color={oneFood.status === "Confirmed" ? "teal" : "orange"}>
              <EditFoodModal
                name={oneFood.name}
                contact={oneFood.contact}
                status={oneFood.status}
                website={oneFood.website}
                eventId={this.props.eventId}
                index={foodI}
                tabIndex={this.props.tabIndex}
                socket={this.props.socket}
              />
              <Button
                basic
                color="transparent"
                content="Grey"
                size="mini"
                icon
                floated="right"
                type="submit"
                onClick={() => this.onDelete(foodI)}
              >
                <Icon name="delete" />
              </Button>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flexDirection: "row",
                    textAlign: "left",
                    paddingBottom: "5px",
                    fontFamily: "palatino",
                    fontSize: "20px"
                  }}
                >
                  <br />
                  Name: <strong>{oneFood.name}</strong> <br />
                  <br />
                  Contact: {oneFood.contact} <br />
                  <br />
                  Website: <a href={oneFood.website}>{oneFood.website}</a> <br />
                  <br />
                  Status: {oneFood.status} <br />
                </div>
              </div>
              <div
                style={{
                  flexDirection: "row",
                  textAlign: "left",
                  fontFamily: "palatino",
                  fontSize: "13px"
                }}
              >
                <Table singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Options</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell>Price Per Person</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <span>
                          <Input
                            placeholder="New Option"
                            type="text"
                            onKeyPress={this.handleKeyPress}
                            onChange={e =>
                              this.setState({ option: e.target.value })
                            }
                            value={this.state.option}
                          />
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span>
                          <Input
                            placeholder="Quantity"
                            type="number"
                            onKeyPress={this.handleKeyPress}
                            onChange={e =>
                              this.setState({ quantity: e.target.value })
                            }
                            value={this.state.quantity}
                          />
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span>
                          <Input
                            labelPosition="right"
                            type="number"
                            placeholder="Price"
                            onKeyPress={this.handleKeyPress}
                            onChange={e =>
                              this.setState({ price: e.target.value })
                            }
                            value={this.state.price}
                          >
                            <Label basic>$</Label>
                            <input />
                          </Input>
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Button icon onClick={() => this.onClick(foodI)}>
                          <Icon name="add square" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>

                    {optionsRender.map((item, i) => {
                        return item
                    })}

                    <Table.Row>
                      <Table.Cell>
                        <div className="summation">Total</div>
                      </Table.Cell>
                      <Table.Cell>
                        {this.state.editTotalBudget === false ? (
                          <span>
                            <Input
                              labelPosition="right"
                              type="number"
                              placeholder="Total Amount"
                              onKeyPress={this.handleNewTotal}
                              onChange={e =>
                                this.setState({ totalBudget: e.target.value })
                              }
                              value={this.state.totalBudget}
                            >
                              <Label basic>$</Label>
                              <input />
                            </Input>
                          </span>
                        ) : (
                          <div
                            className="summation"
                            onClick={() => this.onTrigger()}
                          >
                            ${this.state.totalBudget}
                          </div>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <span />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </Segment>
          </div>
        ))}
        <br />
        <br />
        <AddPeopleModal
          floated="right"
          eventId={this.props.eventId}
          socket={this.props.socket}
          onProps={this.onProps}
          index={this.props.tabIndex}
        />
      </div>
    );
  }
}
