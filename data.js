let responses = [];
const userResponseSection = document.querySelector('#user-responses')
const questionResponseSection = document.querySelector('#question-responses')
const winnerButton = document.querySelector('#button')
const winner= document.querySelector('#winner')

const fetchUserResponses = async () => {
  const response = await fetch('http://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vRA9KPqwDtGfWY4Zf-dnzQLbKHSrXvQUaHnawvJNTAcxe3JBTWPRhPkfIMiaSHBEIjVgjsFojzG_PQV/pub?output=csv');
  const data = await response.text();  
  const results = Papa.parse(data, {header: true})
  responses = results.data;
};


const renderQuestionResponse = questionResponseSection => {
  const favoriteItem = questionResponseSection['What is your favorite breakfast item?'];
  return`
  <div class="favoriteItem-response">
    <ul><li>${favoriteItem}</li></ul></h3>
  </div>
  `;
};

function winnerAnswer (){
  winner.textContent = `Eggs! 🍳`;
  button.disabled = `true`
}
winnerButton.addEventListener('click', winnerAnswer)


const renderUserResponse = userResponse => {
  const name = userResponse['What is your first name?'];
  console.log(userResponse)
  const age = userResponse['How old are you?'];
  const location = userResponse['Where do you live?'];
  const breakfasttype = userResponse['Which of these best describes your typical day-to-day breakfast?'];
  const breakfastpic = userResponse['Please upload a picture of your typical breakfast'];
  const photoId= breakfastpic.split("id=")[1];
  const breakfastitems = userResponse['Which of these items are part of your typical day-to-day breakfast?  (Select All That Apply)']
  const item1 = breakfastitems.split(";")[0];
  const item2 = breakfastitems.split(";")[1];
  const item3 = breakfastitems.split(";")[2];
  // const item4 = breakfastitems.split(";")[3];
  // const item5 = breakfastitems.split(";")[4];
  // const item6 = breakfastitems.split(";")[5];
  
  function emojiTest(item){
    if (item === " Breakfast sandwich/wrap"){
    return"🥪"
    } else if (item === " Bread with some sort of spread (i.e. jam/jelly, cream cheese, butter, etc.)"){
    return "🍞"
    } else if (item === " Eggs"){
    return "🍳"
    } else if (item === " Fruits"){
    return "🍌"
    } else if (item === " Yogurt"){
    return "🍥"
    } else if (item === " Smoothie"){
    return "🥤"
    } else if (item === " Cereal"){
    return "🥣"
    } else if (item === " Muffins/Cakes"){
    return "🧁"
    } else if (item === " Donuts"){
    return "🍩"
    } else if (item === " Sausage/Bacon"){
    return "🥓"
    } else if (item === " Pancakes/Waffles"){
    return "🥞"
    } else if (item === " Juice"){
    return "🧃"
    } else if (item === " Coffee"){
    return "☕️"
    } else if (item === " Tea"){
    return "🍵"
    } else if (item === " Oats/Muesli"){
    return "🌾"
    }
  };
  

  return`
    <div class="user-response">
      <h2>${name}</h2>
      <h3>I am ${age} years old</h3>
      <h3>I live in ${location}</h3>
      <h3> These items are part of my typical breakfast: ${emojiTest(item1)},${emojiTest(item2)},${emojiTest(item3)}</h3>
      <h3 class="breakfast-type">My typical breakfast is composed of ${breakfasttype}, and it looks like this:</h3>
      <img src="https://drive.google.com/thumbnail?id=${photoId}" alt="breakfast" />
    </div> 
  `;
};


const fetchAndShowResponses = async () => {
  await fetchUserResponses()
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponseHTML = eachUserResponseHTML.join('');
  userResponseSection.innerHTML = allUserResponseHTML;
  
  const eachQuestionResponseHTML = responses.map(renderQuestionResponse);
  const allQuestionResponseHTML = eachQuestionResponseHTML.join('');
  questionResponseSection.innerHTML = questionResponseSection.innerHTML + allQuestionResponseHTML;
};

fetchAndShowResponses();