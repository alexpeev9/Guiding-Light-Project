<p align="center">
  <a href="https://github.com/alexpeev9">
    <img src="readme-pictures/lighthouse.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Guiding-Light Project</h3>

  <p align="center">
    Angular Course Work Project
    <br />
    <a href="https://guiding-light-d0c0d.web.app"> Live Demo of Site</a>
    <br />
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#project-description">Project</a>
        <ul>
            <li><a href="#home-page">Home Page</a></li>
            <li><a href="#location-list-page">Location List Page</a></li>
            <li><a href="#detail-page">Detail Page</a></li>
            <li><a href="#register">Register Page</a></li>
            <li><a href="#login">Login Page</a></li>
            <li><a href="#create">Create Page</a></li>
            <li><a href="#update">Update Page</a></li>
            <li><a href="#spinner">Spinner</a></li>
            <li><a href="#errors">Errors</a></li>
            <li><a href="#rules-of-firebase">Database Rules</a></li>
        </ul>
    </li>
    <li><a href="#license">License</a>
    <li><a href="#contact">Contact</a>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
### About The Project

![location-list]

This site is intended for people that are looking for interesting landmarks that are not usually displayed on other sites. People can learn different things about each location. They can also see a map with coordinates so they can find it easier.
* In this version of the project, people can log in the site and create different locations. Users can Create/Update/Delete Location. When users are logged in they can see who made the project and which users have edited the project chronologically.
* In other version of the project, people won't be able te Authenticate and only read about locations. 3 or 4 users will have access to edit the locations. This can be easy done with setting up the rules of our database.

### Built With

* [Angular](https://angular.io/)
* [Firebase Realtime Database](https://firebase.google.com/)
* [Yandex Map](https://yandex.com/dev/maps/)
* [Bootstrap](https://getbootstrap.com/)
* [Angular Archwizard](https://www.npmjs.com/package/angular-archwizard)
* [SASS](https://sass-lang.com/)


<!-- USAGE EXAMPLES -->
### Project Description
#### Home Page
![Home-Page] On the home page people can see the map of Bulgaria. There are different marks on the map. When they click one of them they will see small bubble filled with information about the location they are looking at. If they click the Details button they will be redirected to the details page of the location. 
#### Location List Page
![location-list]
This is the location list page of the site. People can scroll and read information about all the locations that are presented. If they click More Details button they will be redirected to the details page of the location.
#### Detail Page
![details-guest]
If users are not logged in they can still see the details about the location. They can zoom on zoom-out the map for better understanding of the location. They can also copy the CoordsX and CoordsY to insert them in their GPS for car, tardis or etc.
* If users are logged in the site they will see one more bubble with information.
####
![Details-Logged]
Logged Users can update the information about a current location, if they know more information or they found a mistake. We can also see which users have worked on the page. If we edit a page our name will be also presented at the end of the text.
#### Register
![Register]
People can register on this site by clicking on the Register button on the Navigation bar. After they have registered they can login. If we try to type email that is already used or another validation problem we will get an error message. If we leave empty Username or Password our Register button will be locked and we won't be able to login.
#### Login
![Login-page]
They login page has the same validations and will not allow us to login if we don't enter valid username and password. If we don't have an account we can click the Register button which will redirect us to the register page.
![login-validation]
 <br />
Here is an example of where the error message will show up.
#### Create
![create-location-1]
When we are logged inside we will be finally able to see our email on the right side of the navigation bar and a logout button. If we have wanted to click on **Location Create** button we wouldn't be able to go there and the site will always redirect us to Login Page. Now we can Click on Location Create and Create our Location. We can see a wizard that requires us to fill all the missing inputs.
![create-location-2]
There are 2 more wizard steps that we need to fill before we create our Location.
![create-location-3]
If we try to skip one of the inputs our **Create Location button** will **locked** and we won't be able to create a Location. We can see which field is empty by previewing our almost done Location. In our case we can see that the missing field is Address and we have to go back and edit it. After our location is created we will see a corresponding message about our great success.
#### Update
![update-logged]
If we want to edit something we can go to update page (from details) of our location. We can change the information and when we are ready we will click on  **Update Location**. If we are naughty and want to leave one of the fields empty our Update Location will be closed. There is also a **Delete Location** button that will delete our location.
![update-hacker]
* This will only work for the Beta Version of our project. If we have somehow managed to log inside with not authorized user account and try to Create/Update/Delete we will get a message that we don't have permission.
#### Spinner
If the data is not yet loaded to our page we will see a spinner that will indicate us that the data is still loading. When all our needed data is loaded the spinner will be removed and on its place will be our data.

![Spinner](https://user-images.githubusercontent.com/1224640/32701553-4c723b5e-c7d8-11e7-9a1c-bd4c92fbc545.gif)
#### Errors
![error]
If we try to go to non-existing route **( /cats )** or try to edit/update a not existing id by typing 
**/location-details/random** our site will redirect us to */404*. There is also an error view for */500* with even cuter cat but i hope you never see this cat. If you still want to see it you can go to */500*.
### Rules of firebase
![new-rules] 
 <br />
We can see that our users will be able to create/update/delete a location if they are logged in.
If we want our site to be logged in only by admins or just prevent other users from Creating Locations we can set the rules to this.
![old-rules]
 <br />
The red lines are ids of admin users. Also type all the ids on one row.

<!-- LICENSE -->
## License

Distributed under the MIT License.



<!-- CONTACT -->
## Contact

LinkedIn - [Aleksandar Peev](https://www.linkedin.com/in/alexpeev9/)
Instagram - [@alexpeev9](https://www.instagram.com/alexpeev9/)

<!-- MARKDOWN LINKS & IMAGES -->
[home-page]: readme-pictures/home-page.png
[location-list]: readme-pictures/location-list.png

[details-logged]: readme-pictures/details-logged.png
[details-guest]: readme-pictures/details-guest.png

[create-location-1]: readme-pictures/create-location-1.png
[create-location-2]: readme-pictures/create-2-3-step.png
[create-location-3]: readme-pictures/create-final-validation.png

[update-logged]: readme-pictures/update-logged.png
[update-hacker]: readme-pictures/hacker.png

[register]: readme-pictures/register.png
[login-validation]: readme-pictures/login-validation.png
[login-page]: readme-pictures/login.png

[error]: readme-pictures/404.png
[new-rules]: readme-pictures/new-rules.png
[old-rules]: readme-pictures/old-rules.png