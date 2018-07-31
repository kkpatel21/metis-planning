const reducer = (state = [], action) => {
  switch(action.type) {
    case 'REGISTER_USER':
    fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.name,
        lastname:
        email: this.state.email,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat
      })
    })
    .then((response) => response.text())
    .then((text) => {
      if(text === 'incomplete') {
        alert('Please fill in all fields.')
      } else if(text === 'passwords') {
        alert('Passwords must match.')
      } else if(text === 'exists') {
        alert('Account already exists. Please log in.')
        this.props.redirect('Home')
      } else {
        this.props.redirect('Home')
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
