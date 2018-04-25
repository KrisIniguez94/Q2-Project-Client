window.addEventListener('load', event => {
  console.log('Ajax Car Garage Client');
  const baseURL = 'http://localhost:3001/cars/';
  const home = document.getElementById('Home')
  const myGarage = document.getElementById('My-Garage');
  const newCar = document.getElementById('New-Car');
  const about = document.getElementById('About');
  const contactOwner = document.getElementById('Contact-Owner')
  const focusPostEl = document.getElementById('focusPost-car')
  const allPostEl = document.getElementById('all-cars')
  const carListEl = document.createElement('ul');

  const updatePost = (event, id) => {
    const newMakeModel = document.getElementById('edit-make-model').value;
    const newDescription = document.getElementById('edit-description').value;
    const newImage = document.getElementById('edit-image-url').value;
    const newData = {make_model: newMakeModel, description: newDescription, image_url: newImage}
    axios.put(`${baseURL}${id}`, newData)
      .then(result => {

        focusPostEl.innerHTML = '';
        getallPosts();

      })
      .catch(error => {console.error(error);});
  };

  const deleteCar = id => {
    axios.delete(`${baseURL}${id}`)
    .then(response => {
      focusPostEl.innerHTML = '';
      getallPosts()
    })
    .catch(error => {console.error(error);});

  }




   const editCard = car => {
     console.log(car);
     allPostEl.innerHTML = '';
     focusPostEl.innerHTML = '';
     const editPostFormEl = document.createElement('div');
     editPostFormEl.className = 'row';
     editPostFormEl.innerHTML = `
       <form class="col s12 grey darken-4 edit-form">
         <div class="card panel z-depth-5 ">
           <div class="input-field col s12 ">
             <input value="${car.make_model}" id="edit-make-model" type="text" class="validate white-text">
             <label for="edit-make-model">Make and Model</label>
           </div>
           <div class="input-field col s12">
             <input value="${car.description}" id="edit-description" type="text" class="validate white-text">
             <label for="edit-description">Description</label>
           </div>
           <div class="input-field col s12">
             <input value="${car.image_url}" id="edit-image-url" type="text" class="validate white-text">
             <label for="edit-image-url">Image URL</label>
           </div>
         </div>
         <a id = 'update-button' class="waves-effect waves-light btn-large grey darken-2">Update</a>
         <a id = 'delete-button' class="waves-effect waves-light btn-large grey darken-2">Delete</a>
       </form>`;
     focusPostEl.appendChild(editPostFormEl);
     document.getElementById('update-button').addEventListener('click', event => {
       event.preventDefault();
       updatePost(event, car.id);
     });
     document.getElementById('delete-button').addEventListener('click', () => {
       deleteCar(car.id);
     });
   }

   const getallPosts = () => {
    //  allPostEl.innerHTML = '';
     focusPostEl.innerHTML = '';
     axios.get(baseURL)
     .then (response => {
       carListEl.innerHTML = '';
       response.data.forEach(car => {
         let cardEl = document.createElement('div');
         cardEl.className = 'card';
         cardEl.innerHTML =
          `<div class="row">
             <div class="col s12 m3">
               <div class="card">
                 <div class="card-image">
                   <img src=${car.image_url}>
                   <span class="card-title">${car.make_model}</span>
                   <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons edit-button">add</i></a>
                 </div>
                 <div class="card-content">
                   <p>${car.description}</p>
                 </div>
               </div>
             </div>
           </div>`
         ;
         carListEl.appendChild(cardEl);
         let editButtonEl =cardEl.getElementsByClassName('edit-button')[0];
         editButtonEl.addEventListener('click', () => {editCard(car)});
       })


     })
     .catch(error => {console.error(error);});
   }


  myGarage.addEventListener('click', () => {
    console.log('My Garage clicked');

    document.querySelector('#all-cars').appendChild(carListEl);
    getallPosts();
  });

  // const createCar = event => {
  //   const makeModel = document.getElementById('create-make-model').value;
  //   const description = document.getElementById('create-description').value;
  //   const
  // }


 newCar.addEventListener('click', () => {
   newCarForm()
 });

  const createCar = event => {
   const newMakeModel = document.getElementById('create-make-model').value;
   const newDescription = document.getElementById('create-description').value;
   const newImage = document.getElementById('create-image-url').value;
   const newData = {make_model: newMakeModel, description: newDescription, image_url: newImage}
   axios.post(baseURL, newData)
   .then(result => {
     getallPosts();
   })
   .catch(error => {console.error(error);});
   event.preventDefault();
 }

  const newCarForm = () => {
    allPostEl.innerHTML = '';
    focusPostEl.innerHTML = '';
    const newCarFormEl = document.createElement('div');
     newCarFormEl.className = 'row';
    newCarFormEl.innerHTML =  `
    <form class="col s12 grey darken-4 create-form">
       <div class="card panel z-depth-5 ">
         <div class="input-field col s12 ">
           <input value="" id="create-make-model" type="text" class="validate white-text">
           <label for="create-make-model">Make and Model</label>
         </div>
         <div class="input-field col s12">
           <input value="" id="create-description" type="text" class="validate white-text">
           <label for="create-description">Description</label>
         </div>
         <div class="input-field col s12">
           <input value="" id="create-image-url" type="text" class="validate white-text">
           <label for="create-image-url">Image URL</label>
         </div>
       </div>
       <a id = 'create-button' class="waves-effect waves-light btn-large grey darken-2">Create</a>

    </form>`;
       focusPostEl.innerHTML = '';
       focusPostEl.appendChild(newCarFormEl);
       document.getElementById('create-button').addEventListener('click', createCar);
  };




});
