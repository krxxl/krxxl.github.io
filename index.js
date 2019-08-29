//
// $(document).ready(function () {
let inpDate = document.getElementsByClassName('timer__input')[0];
let remDate = document.getElementsByClassName('timer__days')[0];

// $(inpDate).blur(function() {
//   validate_date($(this).val())
// } );
// })
inpDate.addEventListener('blur', function () {
  validate_date(this.value)
});

// })
let timerId;

function validate_date(value) {
  if (timerId) {
    clearInterval(timerId)
  }
  let arrD = value.split(".");
  arrD[1] -= 1;
  let newDate = new Date(arrD[0], arrD[1], arrD[2]);
  if ((newDate.getFullYear() == arrD[0]) && (newDate.getMonth() == arrD[1]) && (newDate.getDate() == arrD[2])) {
    let nowDate = new Date();
    let remaining = newDate - nowDate;
    if (remaining > 0) {
      timerId = setInterval(function () {
        let nowDate = new Date();
        let remaining = newDate - nowDate;
        let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remaining - (days * (1000 * 60 * 60 * 24))) / (1000 * 60 * 60));
        let mins = Math.floor((remaining - (days * (1000 * 60 * 60 * 24) + (hours * (1000 * 60 * 60)))) / (1000 * 60));
        let secs = Math.floor((remaining - (days * (1000 * 60 * 60 * 24) + (hours * (1000 * 60 * 60)) + (mins * (1000 * 60)))) / 1000);
        remDate.innerHTML = days + ' д. ' + hours + ' ч. ' + mins + ' мин. ' + secs + ' сек. '
      }, 1000)
    } else {
      alert('Date must be bigger');
    }

  } else {
    alert("wrong date!");
    return false;
  }
}

let lampContainer = document.getElementsByClassName('lightbulbs')[0];
let items = document.querySelectorAll('.lightbulbs__item');

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('mouseover', function () {
    let bgColor = this.getAttribute('data-color');
    this.classList.add('lightbulbs__item-filter');
    lampContainer.style.backgroundColor = bgColor;
  });
  items[i].addEventListener('mouseout', function () {
    this.classList.remove('lightbulbs__item-filter');
    lampContainer.style.backgroundColor = "";
  });
}


let section = document.getElementsByClassName('parallax__section')[0];
let imgScale = document.getElementsByClassName('parallax__image-scale')[0];

function scrollBanner() {
  let headerText = document.querySelector('.parallax__descrition');
  let imgTran = document.querySelector('.parallax__wrapper');
  let wHeigth = document.documentElement.clientHeight;
  let bottomSection = section.getBoundingClientRect().bottom;
  let point = wHeigth - bottomSection

  if (point > 0 && point < 600) {
    headerText.style.transform = "translateY(" + ((-point + 400) / 4) + "px" + ")";
    imgTran.style.transform = "translateY(" + ((point - 400) / 5) + "px" + ")";
  }
}

window.addEventListener('scroll', scrollBanner);


let leftBtn = document.getElementsByClassName('slider__arrow-left')[0];
let rightBtn = document.getElementsByClassName('slider__arrow-right')[0];
let sliderWin = document.querySelector('.slider__window');


let sliderWidth = sliderWin.scrollWidth;
let left = -780;
let right = 780;
let now = 0;

console.log(sliderWidth);

leftBtn.addEventListener('click', function () {
  if (now == (-sliderWidth + 780)) {
    now = 780;
  }
  now += left;
  let z = -now/780;
  setActive(z);
  sliderWin.style.transform = "translateX( " + now + "px )"
});

rightBtn.addEventListener('click', function () {
  if (!now) {
    now = -sliderWidth;
  }
  now += right;
  let z = -now/780;
  setActive(z);

  sliderWin.style.transform = "translateX( " + now + "px )"
});

let nav = document.getElementsByClassName('slider__navigation')[0];
let sliderItem = document.querySelectorAll('.slider__item');




for (let i = 0; i < sliderItem.length; i++) {
  let dot = document.createElement('span');
  dot.classList.add('slider__dot');
  if(i == 0){
    dot.classList.add('active');
  }
  nav.insertAdjacentElement("beforeEnd", dot);
}

let navEl = document.querySelectorAll('.slider__dot');

function setActive(num){
  let activeEl =  document.querySelector('.slider__dot.active');

  activeEl.classList.remove('active');
  if(num == -0){
    navEl[0].classList.add('active');
  }else {
    navEl[num].classList.add('active');
  }
}

for (let i = 0; i < navEl.length; i++) {
    navEl[i].addEventListener('click', function () {
      now = -i * 780;
      changeSlide(now)
    })
}


function changeSlide(now){
  let z = -now/780;
  setActive(z);
  sliderWin.style.transform = "translateX( " + now + "px )"
}
