const select = document.getElementById('listOfLetters');
const listOfNamesElem = document.getElementById('listOfNames');
const quantityOptions = 5;
const arrLetters = [];
const uniqueArrLetters = [];
let listOfNames = [];



let promise = fetch('https://tartavik.github.io/Anton/list.json', )
  .then(res =>res.json())
  .then(data=>{ 
  	if(data&&data.length){
  		listOfNames = data;
  		selectLetter(uniqueArrLetters[0])
  	}
  })
  .catch(err => {
    console.log('Failed fetch ', err);
  });

select.addEventListener('change',(e)=>{
	selectLetter(e.currentTarget.value);
})



for(let a = 10;a < 36;a++){	
	arrLetters.push(a.toString(36));
};
	
for(;uniqueArrLetters.length < quantityOptions;){
	const uniqueLetter = getUniqueLetter();
	uniqueArrLetters.push(uniqueLetter);
	const option = document.createElement('option');
	option.innerText = uniqueLetter;
	option.value = uniqueLetter;
	select.appendChild(option);
};

function givRandomNumber (min,max) {
	let randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
	return randomNumber;
};

function getUniqueLetter () {
	let randomNumber = 0;
	do{
		randomNumber = givRandomNumber(0,arrLetters.length - 1);
	}while(uniqueArrLetters.indexOf(arrLetters[randomNumber]) !== -1)
	return arrLetters[randomNumber];
};


function selectLetter (firstLetter) {
	listOfNamesElem.innerHTML = '';
	const filteredlistOfNames = listOfNames.filter((el)=>{
		return el.name[0].toLowerCase() === firstLetter;
	})
	if(filteredlistOfNames.length){
		filteredlistOfNames.forEach((el)=>{
			const li = document.createElement('li');
			li.innerText = el.name;
			listOfNamesElem.appendChild(li);
		})
	}else{
		listOfNamesElem.innerText = 'The are no users with name starts on ' + firstLetter; 
	}

}