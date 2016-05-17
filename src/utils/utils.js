// Utils for Atm parent component

import _ from 'lodash';

const Utils = {

  /**
   * isMultipleOf - checks the multiple of a number
   *
   * @param  {Number} withdraw - number to divide
   * @param  {Number} multiple - number which divides for
   * @return {Boolean}          -  true if is equals 0
   */
  isMultipleOf( withdraw, multiple ) {
    if(withdraw % multiple == 0){
      return true;
    } else 
    {
      return false
    }
    // return withdraw % multiple !== 0;
  },

  /**
   * isValueWithinRange - checks if a number is within a range
   *
   * @param  {Number} withdraw    - number to check
   * @param  {Number} minWithdraw - minimum number within the range
   * @param  {Number} maxWithdraw - maximum number within the range
   * @return {Boolean}
   */
  isValueWithinRange( withdraw, minWithdraw, maxWithdraw ) {
    return _.inRange( withdraw, minWithdraw, ( maxWithdraw + 1 ));
  },

  /**
   * isAnyMoneyLeft - checks if an amount is bigger than another
   *
   * @param  {Number} totalMoney - Initial amount
   * @param  {Number} withdraw   - Amount to compare with
   * @return {Boolean} - Returns true if the initial amount is bigger
   * or equal than the amount compared
   */
  isAnyMoneyLeft( totalMoney, withdraw ) {
    return totalMoney >= withdraw;
  },

  getSumCountNotes( notesContainer ) {
    return _.reduce( notesContainer, ( result, value, key ) => {
      // console.log("result", result)
      // console.log("value", value)
      // console.log("key", key)
      result += ( value.count * key );
      return result;
    }, 0 );
  },

  /** TODO Implement this method
   *
   * areAnyNotesLeft - Given a withdrawal amount and the notes available in the ATM machine,
   * check the availability of each note type that you intend to withdraw (you will also need to calculate this)
   * and subsequently check if the ATM machine can dispense these.
   *
   * @param  {Number} withdraw   - Amount to check
   * @param  {Object} notesContainer - Object of objects containing the count for each note
   * @return {Boolean} -
   *
   * This method is used inside getInvalidScenarios from the parent component,
   * so an error can be returned for the availability validation.
   *
   */
  compareNotesAmounts(requiredNotesAmount, currentNotesAmount) {
    if(currentNotesAmount == 0){
      return false
    }
     else if(currentNotesAmount - requiredNotesAmount >= 0){
      return true;
      } else {
       return false;
     }
  },

  areAnyNotesLeft( withdraw, notesContainer ) {
    // console.log("withdraw amount in areAnyNotesLeft method: ", withdraw.value)
    const results = []
    const container = notesContainer;
    // console.log("current notes in areAnyNotesLeft method: ", container)
    const requiredNotes = this.calculateCountNotes(withdraw, notesContainer);
    // console.log("required notes in areAnyNotesLeft method: ", requiredNotes)
    const requiredTenNotes = requiredNotes['10'].count;
    const requiredTwentyNotes = requiredNotes['20'].count;
    const requiredFiftyNotes = requiredNotes['50'].count;
    
    const currentTenNotes = container['10'].count;
    const currentTwentyNotes = container['20'].count;
    const currentFiftyNotes = container['50'].count;
      // console.log("current ten notes: ", currentTenNotes)
      // console.log("current twenty notes: ", currentTwentyNotes)
      // console.log("current fifty notes: ", currentFiftyNotes)

      // console.log("required ten notes: ", requiredTenNotes)
    results.push(this.compareNotesAmounts(requiredTenNotes, currentTenNotes))
    results.push(this.compareNotesAmounts(requiredTwentyNotes, currentTwentyNotes))
    results.push(this.compareNotesAmounts(requiredFiftyNotes, currentFiftyNotes))

    // console.log(results)
    if(results.includes(false)){
      return false;
    } else {
      return true;
    }
  },
    
  

  /** TODO Implement this method
   *
   * calculateCountNotes - Calculates the total count for each type of notes required for withdrawal.
   *
   * @param  {Number} withdraw   - Amount to calculate
   * @param  {Object} notesContainer - ATM notes container
   * @return {Object} - Object of objects containing the count for each note
   *
   * The failing tests from "./test-utils/utilsSpec.js" can give you an idea about
   * how you can develop this method. This application relies on the follow data structure:
   * { 50: { count: 0 }, ... } idem for the rest of notes.
   *
   * "./src/components/atm.js" is the parent component for this React app,
   * there you can understand more how this app works.
   */

   // Oiginal methods below but refactored to one method takeAmountFromWithdraw
  // takeFiftyFromAmount(amount) {
  //   if(amount - 50 >= 0){
  //     amount -= 50;
  //     return true;
  //   } else {
  //     return false;
  //   }   
  // },

  // takeTwentyFromAmount(amount) {
  //   if(amount - 20 >= 0){
  //     amount -= 20;
  //     return true;
  //   } else {
  //     return false;
  //   }   
  // },

  takeAmountFromWithdraw(amount, withdraw) {
      withdraw -= amount;
      return withdraw;
  },

  checkWithdrawCanSubtract( amount, withdraw ) {
    if(withdraw - amount >= 0){
      return true;
    } else {
      return false
    }
  },

  addOneNoteToCount(note, totalCountObject) {
    totalCountObject[note].count += 1;
    return totalCountObject;
  },

  checkOriginalNoteCount(note, notesContainer) {
    // console.log("original count", notesContainer)
    if(notesContainer[note].count > 0){
      return true;
    } else {
      return false;
    }
  },


// the method below was added because the withdraw coming into the function in the test was a
// number BUT in the application, the withdraw coming in was an object so needed to call 
// withdraw.value on it. However, this broke the tests so I needed a way of checking the type
// of the withdraw coming in and setting the amount variable (for use within the calculateCountNotes method) accordingly

  checkTypeOfWithdraw(withdraw){
    if(typeof withdraw === 'object'){
       return withdraw.value;
    } else {
      return withdraw;
    }
  },

  // I have added lots of console.log for debuggin purposes; it allows me to see the exact
  // state of variables and data within those variables in various parts of a method and 
  // within the wider scope of the app itself

  calculateCountNotes( withdraw, notesContainer) {
    // console.log("type of withdraw amount at start of calculateCountNotes: ", typeof withdraw)
    let amount = this.checkTypeOfWithdraw(withdraw)
    // console.log("type of withdraw amount in calculateCountNotes method: ", amount)
    let originalObject = notesContainer;
    let resultObject = {'10':{ count: 0}, '20':{count: 0}, '50':{count: 0}}
    // console.log("withdraw amount in calculateCountNotes method: ", amount)
    // console.log("beginning calculating in calculateCountNotes method")
    while(amount > 0){
      if(this.checkWithdrawCanSubtract(50, amount) && this.checkOriginalNoteCount('50', notesContainer)){
        amount = this.takeAmountFromWithdraw( 50, amount)
        resultObject = this.addOneNoteToCount('50', resultObject)
        // console.log("Count 1: ", resultObject)
      }
      if(this.checkWithdrawCanSubtract(20, amount) && this.checkOriginalNoteCount('20', notesContainer)){
        amount = this.takeAmountFromWithdraw( 20, amount)
        resultObject = this.addOneNoteToCount('20', resultObject)
        // console.log("Count 2: ", resultObject)
      }
      if(this.checkWithdrawCanSubtract(10, amount) && this.checkOriginalNoteCount('10', notesContainer)){
        // breaks here
        amount = this.takeAmountFromWithdraw( 10, amount)
        resultObject = this.addOneNoteToCount('10', resultObject)
        // console.log("Count 3: ", resultObject)
        // need to go back into the 50 loop here to deal with a 0 current 10note count
      } else if(this.checkWithdrawCanSubtract(50, amount) && this.checkOriginalNoteCount('50', notesContainer)){
        amount = this.takeAmountFromWithdraw( 50, amount)
        resultObject = this.addOneNoteToCount('50', resultObject)
        // console.log("Count 4: ", resultObject)

        if(this.checkWithdrawCanSubtract(20, amount) && this.checkOriginalNoteCount('20', notesContainer)){
          amount = this.takeAmountFromWithdraw( 20, amount)
          resultObject = this.addOneNoteToCount('20', resultObject)
          // console.log("Count 2: ", resultObject)
        }
        if(this.checkWithdrawCanSubtract(50, amount) && this.checkOriginalNoteCount('50', notesContainer)){
              amount = this.takeAmountFromWithdraw( 50, amount)
              resultObject = this.addOneNoteToCount('50', resultObject)
              // console.log("Count 4: ", resultObject)
        } else if (this.checkWithdrawCanSubtract(20, amount) && this.checkOriginalNoteCount('20', notesContainer)){
            amount = this.takeAmountFromWithdraw( 20, amount)
            resultObject = this.addOneNoteToCount('20', resultObject)
            // console.log("Count 2: ", resultObject)
        }
      }
      else {
        return resultObject;
      }
    // console.log("withdraw amount: ", withdraw)
    // console.log("note count object: ", resultObject)
    };
    return resultObject;
  },


// refactor below method to above method. However, the above method still quite messy with
// nested loops.


  // calculateCountNotes( withdraw, notesContainer ) {
    
  //   var originalObject = notesContainer;
  //   var resultObject = {'10':{ count: 0}, '20':{count: 0}, '50':{count: 0}}
      
  //   while(withdraw > 0){
  //     // console.log("withdraw amount start: ", withdraw)
  //     // console.log("fifty count: ", originalObject['50'].count)
  //     if(withdraw - 50 < 0 || originalObject['50'].count == 0 || resultObject['50'].count == 2){

  //       if(withdraw - 20 < 0 || originalObject['20'].count == 0 || resultObject['20'].count - resultObject['10'].count >= 1 ){

  //         if(withdraw - 10 < 0 || originalObject['10'].count == 0){
  //           // console.log("current 20 count", resultObject['20'].count)
  //           if(withdraw - 20 < 0){
  //             return false
  //           } else {
  //             withdraw -= 20;
  //             resultObject['20'].count += 1;
  //           }
                                    
  //         } else {
  //           // console.log("TAKING 10")
  //           withdraw -= 10;
  //           resultObject['10'].count += 1;
  //           // console.log("ten iteration count: ", result['10'].count )
  //         }  

  //       } else {
  //         withdraw -= 20;
  //         resultObject['20'].count += 1;
  //         // console.log("twenty iteration count: ", result['20'].count);
  //       }  

  //     } else {
  //     withdraw -= 50;
  //     resultObject['50'].count += 1;
      
  //     }
  //   }
  //   // console.log(resultObject)
  //   return resultObject;
   
  // },

  /**
   * subtractCountFromTotal - subtracts the needed count of notes from the initial amount of notes
   *
   * @param  {Object} withdrawnNotes - Object of objects for the calculated amount of notes needed,
   *  is the object result from calculateCountNotes
   *
   * @param  {Object} availableNotes - Object of objects with the count of each note
   * @return {Object} - Object containing the new amount of each note
   */
  subtractCountFromTotal( withdrawnNotes, availableNotes ) {
    const notes50Used = _.get( withdrawnNotes, '50' );
    const notes20Used = _.get( withdrawnNotes, '20' );
    const notes10Used = _.get( withdrawnNotes, '10' );
    // console.log("withdrawn notes", withdrawnNotes)
    const notes50available = _.get( availableNotes, '50' );
    const notes20available = _.get( availableNotes, '20' );
    const notes10available = _.get( availableNotes, '10' );

    return {
      50: {
        count: notes50available.count - notes50Used.count
      },
      20: {
        count: notes20available.count - notes20Used.count
      },
      10: {
        count: notes10available.count - notes10Used.count
      }
    };
  },

  /**
   * getValidationMessage - Returns the validation message for each withdraw
   *
   * @param  {Object} validationObject - Object with the withdraw validation,
   * is the object result from isWithdrawValid
   *
   * @return {String} - Message that depends on the object passed
   */
  setNoteAvaliablity(note, notesContainer){
    if(notesContainer[note].count > 0){
      return true;
    } else {
      return false;
    }
  },

  setAvailableNotes(notesContainer) {
    let resultObject = {'10':{available: null}, '20':{available: null}, '50':{available: null} }
        
    resultObject['50'].available = this.setNoteAvaliablity('50', notesContainer);
    resultObject['20'].available = this.setNoteAvaliablity('20', notesContainer);
    resultObject['10'].available = this.setNoteAvaliablity('10', notesContainer);
    
    return resultObject;
  },

  setAvalibleString(note, resultObject) {
    if(resultObject[note].available){
      return "£" + note + " ";
    } else {
      return "";
    }
  },

  getAvailableNotes(notesContainer) {
    let resultObject = this.setAvailableNotes(notesContainer)
    let resultString = "";
    // console.log(typeof this.setAvalibleString('10', resultObject))
    let firstString = resultString.concat(this.setAvalibleString('50', resultObject));
    let secondString = firstString.concat(this.setAvalibleString('20', resultObject));
    let finalString = secondString.concat(this.setAvalibleString('10', resultObject));
    console.log(finalString)
    return finalString;
  },

  getValidationMessage( validationObject, notesContainer ) {
    // console.log("validaton object in getValidationMessage method", validationObject)
    // console.log("got notes container", notesContainer)
    // let availableNotesString = this.getAvailableNotes()
    let availablityMessage;
    if(!this.getAvailableNotes(notesContainer).includes("£")){
      availablityMessage = "There are no notes available"
    } else {
      availablityMessage = `The only available notes at this time are ${this.getAvailableNotes(notesContainer)} notes`
    }
    
    
    const validationMsg = {
      notesError: 'There is only notes of £10, £20 and £50',
      notesAvailability: `${availablityMessage}`,
      rangeError: 'Only withdraws between £300 and £10',
      amountError: `Sorry, but the availability is £${validationObject.totalMoney}`,
      balanceError: `Sorry, but your balance is £${validationObject.userMethod}`,
      withdrawError: 'You are not providing a valid withdraw',
      withdrawValidMsg: 'We are dealing with your request'
    };
    // console.log("validationMsg object: ", validationMsg)
    return validationMsg[ validationObject.message ];
  },

  /**
   * getScreenMessage - Returns a message for each screen
   *
   * @param  {Object} props - Global React props "location.pathname"
   * @return {String} - Message that depends on the url passed
   */
  getScreenMessage( props ) {
    // console.log(props.atmData.user.name)
    const screenMsg = {
      '/': `Hello, ${props.atmData.user.name}, welcome to iDotBank`,
      '/withdraw': `${props.atmData.user.name}, do your withdraw`,
      '/balance': 'Balance screen'
    };
    // console.log(screenMsg)
    // console.log(screenMsg[props.location.pathname])
    return screenMsg[ props.location.pathname ];
  },

  /**
   * getBalanceMessage - Returns message with account balance screen
   *
   * @param  {Object} props - Global React props
   * @return {String} - User's account balance
   */
  getBalanceMessage( props ) {
    const { user } = props.atmData;
    return `${user.name}, your current balance account is £${user.accountBalance}`;
  },

  /**
   * getSuccessMessage - Returns message when a withdraw is completed
   *
   * @param  {Object} props - Global React props
   * @return {String} - Success message
   */
  getSuccessMessage( props ) {
    const { name } = props.atmData.user;
    return `${name}, don't forget to take your money!`;
  },

  /**
   * TODO Refactor this method
   *
   * This returns a poorly string, maybe it's because there are some tests missing?
   * Try to return something more meaningful, I was thinking about pictures of notes or ...
   *
   * displayWithdrawnCount - Displays the amount of notes used for withdrawal.
   *
   * @param  {Object} withdrawnNotes - Total count of notes needed
   * @return {String} - Notes values
   */
  displayWithdrawnCount( withdrawnNotes ) {
    if ( withdrawnNotes[ '10' ] === undefined ) {
      return;
    }
    let textResult = 'You have ';
    _.forOwn( withdrawnNotes, ( value, key ) => {
      textResult += `${value.count} £${key} notes, `;
    });
    return textResult;
  }
};

module.exports = Utils;
