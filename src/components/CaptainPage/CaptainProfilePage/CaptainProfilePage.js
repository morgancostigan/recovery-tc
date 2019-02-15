import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'


// Styles
import './CaptainProfilePage.css';



class CaptainProfilePage extends Component {

  state = {
    open: false,
    title: '',
    date: '',
    time: '',
    address: '',
    description: '',
    image: '',
    capacity: null,
    venue: '',
    id: '',
    captain_id: '',
  }

  handleOpen = (event) => {
    console.log(this.state);
    this.setState({
      title: event.title,
      date: event.date,
      time: event.time,
      address: event.address,
      description: event.description,
      image: event.image,
      capacity: event.capacity,
      venue: event.venue,
      id: event.id,
      captain_id: event.captain_id,
      file: null,
    })
    this.setState({
      open: true
    })
  }
  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
    console.log(this.state);

  }
  handleDateChange = (event) => {
    this.setState({
      date: event.target.value
    })
  }
  handleTimeChange = (event) => {
    this.setState({
      time: event.target.value
    })
  }
  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value
    })
  }
  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    })
  }
  handleImageChange = (event) => {
    this.setState({
      image: event.target.value
    })
  }
  handleCapacityChange = (event) => {
    this.setState({
      capacity: event.target.value
    })
  }
  handleVenueChange = (event) => {
    this.setState({
      venue: event.target.value
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }
  handleSubmitClose = () => {
    // this.props.dispatch({ type: 'EDIT_EVENT', payload: this.state })
      const formData = new FormData();
      if(this.state.file !== null) {
        formData.append('file', this.state.file[0]);
      }
      formData.append('title', this.state.title);
      formData.append('date', this.state.date);
      formData.append('time', this.state.time);
      formData.append('address', this.state.address);
      formData.append('description', this.state.description);
      formData.append('image', this.state.image);
      formData.append('capacity', this.state.capacity);
      formData.append('venue', this.state.venue);
      formData.append('id', this.state.id);
      axios.put(`api/imageUpload/edit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
              this.props.history.push('/home')
        }).catch(error => {
          // handle your error
          console.log(error);
        });
    this.setState({
      open: false
    })
    swal("Event Updated!", "You have successfully updated an event!", "success");
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
    console.log(this.state.files);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CAPTAIN_PROFILE', payload: this.props.match.params.id })
    this.props.dispatch({ type: 'FETCH_EVENT_LIST' });
   
  }

  handleCancelEvent = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once cancelled, you will not be able to recover this event!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Event has been cancelled", {
          icon: "success",
        });
        this.props.dispatch({ type: 'CANCEL_EVENT', 
        payload: {id: id}, 
        refresh: {id: id} })
      } else {
        swal("Event has NOT been cancelled" )
      }
    });
    
    // console.log(this.state)

  }

  handleEdit = (event) => {
    console.log('editting', event);
    // this.props.dispatch({ type: 'FETCH_THIS_EVENT', refresh: id })

    // console.log(this.state)
    setTimeout(this.handleOpen, 1000)
    this.handleOpen(event)

  }


  render() {
    console.log('eventlist', this.props.eventList)

    
    let profileContent = this.props.captainProfile.map((profile, i) => {
      return (
        <div key={i} className="captain-wrapper">

          <div className="picture-container">
            <img src={profile.image} alt="me" className="captain-picture" />
          </div> {/* .picture-container */}

          <div className="icon-buttons">
          <div className="icon-box">
            <img src="/editIcon.svg" alt="edit profile" className="icons" onClick={() => this.props.history.push(`/captain/profile/edit/${profile.id}`)} />
            <p>Edit Profile</p>
          </div>
          <div className="icon-box">
            <img src="/addEventIcon.svg" alt="edit event" className="icons" onClick={() => this.props.history.push('/captain/addevent')} />
            <p>Create Event</p>
          </div>
          </div> {/* .icon-buttons */}


          <div className="bio">
            <p className="demo-p-tag">INFO</p>
            <div className="style-blank-div"></div>
          </div>

          <div className="demo-info">
            <div className="static-data">
              <p className="demo-p-tag">Username:</p>
              <p className="demo-p-tag">Name: </p>
              <p className="demo-p-tag">Email:</p>
              <p className="demo-p-tag">Phone:</p>
            </div>
            <div className="captain-data">
              <p className="demo-p-tag">{profile.username}</p>
              <p className="demo-p-tag">{profile.first_name} {profile.last_name}</p>
              <p className="demo-p-tag">{profile.email}</p>
              <p className="demo-p-tag">{profile.phone}</p>
            </div>
          </div> {/* .demo-info */}

          <div className="bio">
            <hr />
            <p className="demo-p-tag">BIO</p>
            {/* <div className="style-blank-div"></div> */}
            <p className="demo-p-tag">{profile.bio}</p>
            <div className="style-blank-div"></div>
          </div>
          
          {/* .bio */}
        </div>
        // .captain-wrapper
      )
    })


    return (
      console.log('this.props.match.params.id', this.props.match.params.id),
      

      <div className="captain-container">
        {profileContent}

        {/* Beginning of the Events page */}
      <div className="event-root">
        <h1 className="h1-event">My Current Events</h1>

        <hr />


        <div className="event-data-root">
        
          {this.props.eventList.map((event, i) => {
            if (Number(event.captain_id) === Number(this.props.match.params.id)) {
              
              return (                
                <div key={i} className="root">
                 <Link to={`/events/${event.id}`}>
                  <div className="event-data">
                    <p>{moment(event.date).format("MMM Do YYYY")}</p>
                    <p>{moment(event.time, "HH:mm").format("hh:mm A")}</p>
                    <p className="event-title">{event.title}</p>
                  </div>

                  <div className="image-container">
                    <img src={event.image} alt="event" className="image-url" />
                  </div>
                  </Link>
                <div className="edit-event-box">
                  <img src="/editEventIcon.svg" alt="edit Event" className="event-btn" onClick={() => this.handleEdit(event)} />
                  <p>Edit Event</p>
                </div>
                <div className="delete-event-box">
                  <img src="/delete.svg" alt="cancel Event" className="event-btn" onClick={() => this.handleCancelEvent(event.id)} />
                  <p>Delete</p>
                </div>
                </div>
                // .root2
              )
            }
          })}
          </div>{/* .event-data-root */}
        </div> {/* .event-root */}


        {/* Pop up Dialog to edit events */}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
              <div>
                <TextField
                  label="Title"
                  placeholder="Title"
                  value={this.state.title}
                  margin="normal"
                  onChange={this.handleTitleChange}
                />
              </div>
              <div>
                <TextField
                  type="date"
                  value={moment(this.state.date).format('YYYY-MM-DD')}
                  margin="normal"
                  onChange={this.handleDateChange}
                />
              </div>
              <div>
                <TextField
                  type="time"
                  margin="normal"
                  value={this.state.time} //no moment.js here!!!
                  onChange={this.handleTimeChange}
                />
              </div>
              <div>
                <TextField
                  label="Address"
                  placeholder="Address"
                  margin="normal"
                  value={this.state.address}
                  onChange={this.handleAddressChange}

                />
              </div>
              <div>
                <TextField
                  label="Description"
                  placeholder="Description"
                  margin="normal"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                />
              </div>
              <div className="img-select">
                {/* <TextField
                  label="Image Url"
                  placeholder="Image Url"
                  margin="normal"
                  value={this.state.image}
                  onChange={this.handleImageChange}
                /> */}
                <p>Image</p>
                <input label='upload file' type='file' onChange={this.handleFileUpload} />
              </div>
              <div>
                <TextField
                  label="Capacity"
                  placeholder="Capacity"
                  margin="normal"
                  value={this.state.capacity}
                  onChange={this.handleCapacityChange}
                />
              </div>
              <div>
                <TextField
                  label="Venue"
                  placeholder="Venue"
                  margin="normal"
                  value={this.state.venue}
                  onChange={this.handleVenueChange}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button className="modal-cancel" onClick={this.handleClose} >
                Cancel
                </Button>
              <Button className="modal-submit" onClick={this.handleSubmitClose} >
                Submit
                  </Button>
            </DialogActions>
          </Dialog>
      </div>
      // .captain-container
    )
  }
}


const mapStateToProps = state => ({
  captainProfile: state.captainProfile,
  thisEvent: state.thisEvent,
  eventList: state.eventList,
  user: state.user,
})


export default connect(mapStateToProps)(CaptainProfilePage);