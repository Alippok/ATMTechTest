## Alasdair Lippok

* Began work by cloning from GutHub repo and then creating my own repo
* I then moved onto looking at the different components and sketching out a rough design of the 'flow' of the app
* Trying to follow and understand a completed codebase was a challenging and interesting exercise as it took time to find the starting point, follow data around, find out when different methods were being called and what state objects were in at different parts of the application
* I used a lot of console logging to aid me at this point because it allowed me to view what was going on
* I found it extremely beneficial to spend time mapping out the basic flow of the application as I could then use this knowledge when implementing new methods

## Tests
* I then began work on passing each test in turn
* It was challenging at first to get used to the slightly different syntax of the tests but with practise, I was comfortable in using the tests
* Using the predefined tests and my own tests really helped me to begin coding the methods and bringing them together

## calculateCountNotes method
* The most challenging part of this challenge was implementing the calculateCountNotes method
* I first used the commented out method which was very messy but managed to get the right count of notes for different withdraw amounts
* However, I then decided to pull out some of the loops and functionality and put them into separte methods on the utils class
* This seemed a lot cleaner but there is still more that I would separate out into different methods

## areAnyNotesLeft method
* After this, I tried implementing the areAnyNotesLeft method. This again started off quite messy and was particularly challenging to implement but after pulling some of the logic out and putting in a separate method, reads a bit better
* You can see in these methods that I have used a lot of console.log; I used these to help me debug the methods to see exactly what state different variables and objects have at each point in the methods and application
* I would now remove those from the methods but have left them in to demonstrate my thinking proccess and problem solving approach

## Displaying available notes to user as error message
* I wanted to display (to the user) the different notes that were available in the event of some notes not being available
* This was challenging because I had to find out exactly where in the programme the message object was being set which involved a lot of console.logs to place signposts for myself
* I also had to make sure the right data got passed to the apporapriate method
* I then separtated the logic for checking which notes were available and displaying the appropriate string to the user into different methods (setNoteAvaliablity, setAvailableNotes, setAvalibleString, getAvailableNotes)
* Finally, I had some logic in the getValidation method which I decided to put into its own method called setAvailabilityMessage
* The next steps for this method would be to display the exact number of notes available and/or the reason why they could not be dispensed for the given withdraw amount
* I would also like to add in commas and an 'and' in the display of notes dispensed and notes available


* Unfortunately, I did not manage to complete the wireframes styling of the application but I have completed all other parts of the checklist. I enjoyed the challenge of this tech-test and has really challenged my understanding of React, abstraction and problem solving in programming

## Running the code
* To run the code, first MAKE SURE you are in the DEVELOP BRANCH of the project (run 'git checkout develop' to move to that branch)
* Then run 'npm install' in the app's root directory to install everything need to run the app
* Run 'npm start' in the to start the application
* Finally, go to your localhost in your web-browser to use the application


## Prerequisites

[Node.js](http://nodejs.org/) must be installed.

## Installation

```shell
# Clone the repository
> git clone https://github.com/DeloitteDigitalUK/atm-case-study.git

# Install dependencies
> cd atm-case-study
> npm install
```
* Running `npm install` in the app's root directory will install everything you need for development.

## Development Server

* `npm start` will run the app's development server at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

* `npm run test-utils` will run the unit tests for the Utils module.
* `npm run test-utils:watch` will run the unit tests for the Utils module on every change.


## Building

* `npm run build` creates a production build by default.

   To create a development build, set the `NODE_ENV` environment variable to `development` while running this command.

* `npm run clean` will delete built resources.

## Project structure

Here you can see the structure for this repo:

```
|-- atm-case-study
    |-- .eslintignore
    |-- .eslintrc
    |-- .gitignore
    |-- README.md
    |-- nwb.config.js
    |-- package.json
    |-- public
    |   |-- index.html
    |-- src
    |   |-- index.js
    |   |-- components
    |   |   |-- atm.js
    |   |   |-- balance.js
    |   |   |-- main.js
    |   |   |-- navigation.js
    |   |   |-- withdraw.js
    |   |-- router
    |   |   |-- AppRouter.js
    |   |-- utils
    |       |-- utils.js
    |-- test-helpers
    |   |-- mockState.js
    |-- test-utils
    |   |-- mocha.opts
    |   |-- utilsSpec.js
```

**Under the hood, this app is using [`nwb`](https://github.com/insin/nwb). A npm package that helps developers to built and setup Javascript projects. Some of the available scripts mentioned above are mapped to `nwb` commands**.

**For more information see the `package.json` file or run the `nwb` command on your terminal**

