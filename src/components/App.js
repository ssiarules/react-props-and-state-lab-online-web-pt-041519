import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

onChangeType = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

onFindPetsClick = (e) => {
  switch(this.state.filters.type) {

    case 'dog':
    fetch('/api/pets?type=dog')
    .then(res => res.json())
    .then(pets => this.setState({ pets }))
    break;

    case 'cat':
      fetch('/api/pets?type=cat')
      .then(res => res.json())
      .then(pets => this.setState({ pets }))
    break;

    case 'micropig':
      fetch('/api/pets?type=micropig')
      .then(res => res.json())
      .then(pets => this.setState({ pets }))
    break;

    default:
      fetch('/api/pets')
      .then(res => res.json())
      .then(pets => this.setState({ pets }))

  }
}

onAdoptPet = petId => {
  const pets = this.state.pets.map(p => {
    return p.id === petId ? {...p, isAdopted: true} : p;
  })
  this.setState({pets});
}


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeFilterType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
