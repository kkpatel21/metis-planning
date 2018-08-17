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
import EditFoodModal from "../../Modals/EditVenueModal";

export default class Food extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      price: 0,
      quantity: 0,
      option: "",
      pricePerPerson: 0,
      total: 0
    };
  }

  componentDidMount = () => {
    this.props.socket.emit("getFood", {
      eventId: this.props.eventId,
      index: this.props.tabIndex
    });
    this.props.socket.on("updatedFood", data => {
      console.log("updatedfood?????", data.updatedFood.data);
      this.setState({ data: data.updatedFood.data });
      console.log("DATA UGH", this.state.data);
    });
    this.props.socket.on("updatedFoodOptions", data => {
      //   var newTotal =
      //     data.updatedFood.data[data.optionIndex].total +
      //     data.updatedFood.data[data.optionIndex].option[
      //       data.updatedFood.data[data.optionIndex].option.length - 1
      //     ].price;
      //   console.log(
      //     "updatedFoodOptions!!!!!",
      //     data.updatedFood.data[data.optionIndex].option
      //   );
      console.log("what data state looks like--------> ", this.state.data);
      this.setState({ data: data.updatedFood.data });
      console.log(
        "what data state looks like AFTER--------> ",
        this.state.data
      );
    });
  };
  //deleting whole food
  onDelete = index => {
    this.props.socket.emit("deleteFood", {
      eventId: this.props.eventId,
      index: this.props.tabIndex,
      i: index
    });
  };
  //delete one option
  deleteItem = (indexOfData, indexOfOption) => {
    this.props.socket.emit("deleteFoodItem", {
      eventId: this.props.eventId,
      index: this.props.tabIndex,
      iofd: indexOfData,
      iofo: indexOfOption
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
    let optionsRender = [];
    let total = 0;
    let totalQ = 0;
    return (
      <div>
        <div>
          <Header as="h1">{this.props.title}</Header>
          <Divider />
        </div>
        {this.state.data.map((oneFood, foodI) => (
          <div>
            <Segment color={oneFood.status === "Confirmed" ? "teal" : "orange"}>
              {/* <EditFoodModal
                name={oneFood.name}
                contact={oneFood.contact}
                status={oneFood.status}
                address={oneFood.address}
                price={oneFood.price}
                eventId={this.props.eventId}
                index={venueI}
                onProps={this.onProps}
                tabIndex={this.props.tabIndex}
                socket={this.props.socket}
              /> */}
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
                  Website: <a href={oneFood.website}>{oneFood.name}</a> <br />
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
                      <Table.HeaderCell>Servings</Table.HeaderCell>
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
                      <Table.Cell />
                      <Table.Cell>
                        <Button icon onClick={() => this.onClick(foodI)}>
                          <Icon name="add square" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>

                    {/* {optionsRender.map((item, i) => {
                      return item;
                    })} */}
                    {oneFood.option.map((option, optionIndex) => (
                      <Table.Row>
                        <Table.Cell>{option.option}</Table.Cell>
                        <Table.Cell>{option.quantity}</Table.Cell>
                        <Table.Cell>${option.price}</Table.Cell>
                        <Table.Cell>
                          ${option.price / option.quantity}
                        </Table.Cell>
                        <Table.Cell>
                          <span>
                            {/* <UpdateBudgetLineItemModal
                              socket={this.props.socket}
                              lineItem={item}
                              i={index}
                              eventId={this.props.eventId}
                            /> */}
                            <Icon
                              name="trash"
                              onClick={() =>
                                this.deleteItem(foodI, optionIndex)
                              }
                            />
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    ))}

                    <Table.Row>
                      <Table.Cell>
                        <div className="summation">Total</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div>
                          {oneFood.option.map(i => {
                            totalQ += parseFloat(i.quantity);
                          })}
                          {totalQ} servings
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div>
                          {oneFood.option.map(i => {
                            total += parseFloat(i.price);
                          })}
                          ${total}
                        </div>
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
