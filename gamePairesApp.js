(()=>{


  function createFromTemplate(template) {
    const element = document.createElement('template');
    element.innerHTML = template.trim();
    return element.content.firstChild;
  };

  function cleanDocument() {
    document.body.innerHTML = '';
  };

  function displayNone(selector) {
    document.querySelector(selector).style.display='none';
  };

  function createContainer() {
    const templeContainer =`<div class="container mb-5"></div>`;
    const containerInitial = createFromTemplate(templeContainer);
    return containerInitial;
  };

  function createAppChoiseForm() {
    const templateForm = `
    <form class="form row" style="margin-top:50px">
      <div class="col-sm-10">
        <input class="input form-control" type="number" placeholder="Введите количество карт по горизонтали/вертикали" width="100%">
      </div>
      <div class="col-sm-2">
        <button class="button btn btn-dark">Начать игру</button>
      </div>
    </form>
    `;
    const formInitial = createFromTemplate(templateForm);
    return formInitial;
  };

  function createTimerInitial(){
    const templateTimer = `
      <div class="timer-block row justify-content-center">
      <div class="col-2">
        <h2 class="timer-block__header">Таймер:</h2>
      </div>
      <div class="col-1">
        <h2 class="timer-block__timer">60</h2>
      </div>
      </div>
    `;
    const timerInitial = createFromTemplate(templateTimer);
    return timerInitial;
  };

  function createPlayingFieldInitial() {
    const templatePlayingField =`
    <div class="playing-field row justify-content-center"></div>
    `;
    const playingFieldInitial = createFromTemplate(templatePlayingField);
    return playingFieldInitial;
  };

  function createCardInitial(){
    const templateCard =`
    <div class="card bg-light" col-1></div>
    `;
    const CardInitial = createFromTemplate(templateCard);
    return CardInitial;
  }

  function createGameOver() {
   const templeGameOver =`
   <div class="row justify-content-center game-over-block">
    <div class="col-12 style="text-align: center">
      <h2 class="game-over__header";></h2>
    </div>
    <div class="repeat-button col-12">
      <button class="button btn btn-dark btn-lg button-game-over">Играть</button>
    </div>
   </div>
   `
   const gameOverInitial = createFromTemplate(templeGameOver);
   return gameOverInitial;
  };

  function choiseFormSubmit() {
    const input = document.querySelector('.input');
    const form = document.querySelector('.form');
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      let arr = [];
      arr.push(input.value);
      for (const i of arr) {
        if ((i>10) || (i<2) || (i%2===1)) {
          input.value = 4;
          break;
        }else{
          let numberArr = createInitialArr(input);
          displayNone('.form');
          gameTimer();
          console.log(numberArr);
          playGame(numberArr);
        };
      };
    });

  };

  function createInitialArr(input) {
    const initialArr =[];
    for (i = 1; i<=(input.value*input.value/2); i++) {
      initialArr.push(i);
      initialArr.push(i);
    };

    for (i= initialArr.length -1; i > 0; i--) {
      j = Math.floor(Math.random()*(i + 1));
      k = initialArr[i];
      initialArr[i] = initialArr[j];
      initialArr[j] = k;
    };
    return initialArr;
  };

  function gameTimer() {
    const timer = document.querySelector('.timer-block__timer');
    document.querySelector('.timer-block').style.display="flex";

    let time = 60;
    let timerInterval;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      time--;
      timer.innerHTML = time;
      if (time===0) {
        clearInterval(timerInterval);
        gameStop('GAME OVER')
        };
    }, 1000);
  };

  function gameStop(gameOver) {
    displayNone('.timer-block');
    displayNone('.playing-field');
    document.querySelector('.game-over-block').style.display='flex';
    document.querySelector('.game-over__header').innerHTML = gameOver;
  };

  function gameOverRepeate() {
    displayNone('.game-over-block');
    document.querySelector('.button-game-over').addEventListener('click',()=>{
      console.log('играть сначала');
      displayNone('.game-over-block');
      cleanDocument();
      createGamePairesApp();
    });
  };

  function fontSizeActiveCard(card) {
    card.style.fontSize=`${String(Number(window.getComputedStyle(card).width.slice(0, -2))/2)}px`;
  }

  function playGame(numberArr) {
    const playField = document.querySelector('.playing-field');
    playField.style.display='flex';
    let paire = 0;
    let arr = [];

    for(const card of numberArr) {
      const cardNumber = createCardInitial();
      cardNumber.style.width = `${String(Math.round(Number(window.getComputedStyle(playField).width.slice(0, -2))/Math.sqrt(numberArr.length))-4)}px`;
      cardNumber.style.height = cardNumber.style.width;
      cardNumber.textContent = card;
      playField.append(cardNumber);
    };

    const cards = document.querySelectorAll ('.card');

    for (const card of cards) {
      card.addEventListener('click', ()=> {
        if (card.classList.contains('card__active')===false) {
          card.classList.add('card__active');
          fontSizeActiveCard(card);
          arr.push(card.textContent);
          console.log(arr);
          if (arr.length===2) {
            console.log('пара');
            if (arr[0]===arr[1]) {
              console.log('равны')
              paire++;
              document.querySelectorAll('.card__active').forEach((el)=>{
                   el.classList.remove('card__active');
                   el.classList.add('card__open');
                   if (paire===cards.length/2) {
                    gameStop('WINNER');

                   }
              });
            }else {
              console.log('не равны');
              document.querySelectorAll('.card__active').forEach((el)=>{
                setTimeout(()=>{
                   el.classList.remove('card__active');
                   el.style.fontSize='0';
                }, 500);

              });
            };
            arr=[];
          }
        };
     });
  }
};

  function createGamePairesApp() {
   const containerAppend = createContainer();
   document.body.append(containerAppend);
   const container = document.querySelector('.container');
   const createForm = createAppChoiseForm();
   const playingField = createPlayingFieldInitial();
   const createTimer = createTimerInitial();
   const gameOver =  createGameOver('GAME OVER');

   container.append(createForm);
   container.append(createTimer);
   container.append(gameOver);
   container.append(playingField);


   displayNone('.timer-block');
   displayNone('.playing-field');

   choiseFormSubmit();
   gameOverRepeate();


  };


  window.createGamePairesApp = createGamePairesApp;

})();
