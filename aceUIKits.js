/*!
 * AceUI Kit
 * (c) 2020 Abayomi Oyewumi, MIT License, https://gomakethings.com
 * Desc : InvalidateJS is a inline form Validation Plugin, the essense of this is to enable form validation without hiccups
 * This Plugin require no Javascript Framework or Library
 */

//TODO : Restrict Number Field or Required Number from Accepting Text
//TODO : Money Validation (format Money Alternative)
//TODO : EqualTo Validation
if(typeof _a === 'undefined'){
    window['_a'] = {};
}

//If Element Contain Children Nodes
const aceUIValidateErrorNode = (elm, message) => {
      // console.log(elm.classList);
      // console.log(message);
      elm.classList.add('aceUIValidateError');

      let errorBox = elm.parentNode.querySelector('.aceUIValidateErrorMessage');
      if (errorBox === null) {
            errorBox = document.createElement('div');
            errorBox.classList.add('aceUIValidateErrorMessage');
      }

      errorBox.innerHTML = message;
      elm.parentNode.append(errorBox);
      // return false;
}

//Append Error To Element`
const aceUIValidateRemoveErrorNode = elm => {
      elm.classList.remove('aceUIValidateError');
      let errorBox = elm.parentNode.querySelector('.aceUIValidateErrorMessage');
      if (errorBox !== null) {
            elm.parentNode.removeChild(errorBox);
      }
}

// Validate Form on Submit
const aceUIValidateEventsListener = form => {
      let callBack = form.getAttribute('callback');

      //Loop Through Elements
      let elms = form.elements;
      let formElms = ["input", "select", "file", "textarea"];
      // console.log(elms);

      for (let i = 0; i < elms.length; i++) {

            let tag = elms[i].tagName.toLowerCase();

            if (formElms.includes(tag)) {
                  aceUIValidateElement(elms[i]);
            }
      }


      let errorState = form.querySelectorAll('.aceUIValidateError');
      let errorMsg = form.querySelectorAll('.aceUIValidateErrorMessage');

      if (errorState.length === 0 && errorMsg.length === 0) {
            window._a[callBack](form, serializeData = aceUIValidateSerializedToObject(form));
      }

}

//Validate Form Element
const aceUIValidateElement = elm => {
      let validReq = elm.classList;

      //Validate General
      if (validReq.contains('required')) {
          if(elm.value === '' || elm.value.trim() === '' && !validReq.contains('aceUIValidateError')){
              aceUIValidateErrorNode(elm, 'This field is required');
              return false;
          }else{
              aceUIValidateRemoveErrorNode(elm);
          }

      } else {
            aceUIValidateRemoveErrorNode(elm);
      }

      //Email Validation
      if (validReq.contains('email') && !validReq.contains('aceUIValidateError')) {

            //If Empty Ignore if email is defined
            // if(elm.value === "" || !elm.classList.contains('required')){
            if(elm.value === ""){

            }else{

                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(elm.value) === true) {
                      aceUIValidateRemoveErrorNode(elm);
                } else {
                      aceUIValidateErrorNode(elm, 'Content not a valid Email');
                      return false;
                }
            }
      }

      //Number Validation
      if (validReq.contains('number') && !validReq.contains('aceUIValidateError')) {
            // console.log(Number(elm.value));
            if (isNaN(elm.value)) {
                  aceUIValidateErrorNode(elm, 'Content not a valid Number');
                  return false;
            } else {
                  aceUIValidateRemoveErrorNode(elm);
            }
      }
}

const aceUIValidateSerializedToObject = (form) => {
      let serializeData = {};

      let elms = form.elements;
      let formElms = ["input", "select", "file", "textarea"];

      for (let x = 0; x < elms.length; x++) {

            let tag = elms[x].tagName.toLowerCase();

            if (formElms.includes(tag)) {
                  // console.log(elms[x]);
                  serializeData[elms[x].name] = elms[x].value;
            }
      }

      return serializeData;
}



function aceUIShade(targetElm, message) {
      targetElm.classList.add('aceUIShadeParent');


      let shades = targetElm.querySelectorAll('.aceUIShadeBlock');

      // Remove All of them
      if (shades.length > 0) {
            for (let i = 0; i < shades.length; i++) {
                  shades[i].outerHTML = "";
            }
      }

      //Now Create Element
      if (shades.length === 0) {

            let aceUIShadeBlock = document.createElement('div');
            aceUIShadeBlock.classList.add('aceUIShadeBlock');
            targetElm.append(aceUIShadeBlock);

            if (message === '') {
                  message = 'Loading, please wait...';
            }

            let aceUIShadeMessage = document.createElement('div');
            aceUIShadeMessage.classList.add('aceUIShadeMessage');
            aceUIShadeMessage.innerHTML = message;
            aceUIShadeBlock.append(aceUIShadeMessage);

            aceUIShadeMessage.style.left = `calc( 50% - 125px )`;
            aceUIShadeMessage.style.top = `calc( 50% - 35px )`;
      }
}

function closeaceUIShade(elm) {
      let shades = elm.querySelectorAll('.aceUIShadeBlock');

      // Remove All of them
      if (shades.length > 0) {
            for (let i = 0; i < shades.length; i++) {
                  shades[i].outerHTML = "";
            }
      }
}

function aceUIStripMessage(message, status) {
      let theme = '#333';

      switch (status) {
            case 0:
                  theme = '#f58400';
                  break;

            case 1:
                  theme = '#5ba200';
                  break;

            case 2:
                  theme = '#bd0000';
                  break;
      }

      let notificationStrip = document.querySelector('.notificationStrip');
      // notificationStrip.style.display = 'block';
      notificationStrip.style.backgroundColor = theme;
      // console.log(theme);

      notificationStrip.querySelector('.container').innerHTML = message;

      let notificationStripHeight = notificationStrip.offsetHeight;
      // console.log(notificationStripHeight);
      // notificationStrip.style.display = 'none';
      let cnt = Number(notificationStrip.offsetTop);
      // console.log(notificationStrip.offsetTop);

      let slideDown = setInterval(() => {
            cnt = cnt + 5;
            notificationStrip.style.top = cnt+'px';
            if (cnt >= 0) {
                  notificationStrip.style.top = '0px';
                  clearInterval(slideDown);

                  setTimeout(() => {
                        clearaceUIStrip();
                  }, 4500);
            }
      }, 20);
}

//Clear Strip Message
function clearaceUIStrip() {
      let notificationStrip = document.querySelector('.notificationStrip');
      let cnt = 0;

      notificationStrip.querySelector('.container').innerHTML = "";

      let slideUp = setInterval(() => {
            cnt = cnt - 5;
            notificationStrip.style.top = cnt+'px';
            if (cnt <= -100) {
                  clearInterval(slideUp);
            }
      }, 20);
}



(() => {
      // Create All UI CSS ----------------------------------------------------------------------------------------------------------
      let style = document.createElement('style');
      style.setAttribute('id', 'aceUIValidateStyle');

      style.innerHTML = `
          .aceUIValidateError{
               border: solid 1px #C00;
          }
          .aceUIValidateErrorMessage{
               float : right;
               padding : 0px 3px;
               color : #F00;
               font-size : 10px;
               font-family : sans-serif;
               font-weight: 400;
          }

          .aceUIShadeParent{
               position : relative;
          }
          .aceUIShadeBlock{
               top : 0px;
               left : 0px;
               position : fixed;
               width : 100%;
               height : 100%;
               background : #000;
               opacity : 0.8;
               z-index : 1000000000;
               border-radius : 3px;
               padding : 15px;
          }
          .aceUIShadeMessage{
               padding : 15px 25px;
               border-radius : 5px;
               background : #FFF;
               float : left;
               color : #000;
               font-size : 13px;
               position : absolute;
               width : 250px;
               text-align: center;
          }
     `;

      document.body.prepend(style);

      window.document.body.addEventListener('submit', (e) => {
            e.preventDefault();

            let form = e.target;
            if (form.classList.contains('aceUIValidate')) {
                  aceUIValidateEventsListener(form);
            }
      });



      //Focus Out
      window.document.body.addEventListener('focusout', e => {
            let elm = e.target;
            let tag = elm.tagName.toLowerCase();

            if (tag === 'input' || tag === 'select' || tag === 'textarea' || tag === 'file') {
                  //Check if its a child of Validate Me
                  if (elm.form !== null && elm.form.classList.contains('aceUIValidate')) {
                        aceUIValidateElement(elm);
                  }
            }

      })

      //Focus In
      window.document.body.addEventListener('focusin', e => {
            let elm = e.target;

            let tag = elm.tagName.toLowerCase();

            if (tag === 'input' || tag === 'select' || tag === 'textarea' || tag === 'file') {
                  //Check if its a child of Validate Me
                  if (elm.form !== null && elm.form.classList.contains('aceUIValidate')) {
                        aceUIValidateRemoveErrorNode(elm);
                  }
            }
      })

      //Validate Number to Enforce Number keys only
      window.document.body.addEventListener('keydown', e => {
            let elm = e.target;

            let tag = elm.tagName.toLowerCase();

            if (tag === 'input' || tag === 'textarea') {
                  //Check if its a child of Validate Me
                  if (elm.form !== null && elm.form.classList.contains('aceUIValidate')) {

                        if (elm.classList.contains('number')) {

                              let keys =  [46, 8, 9, 27, 13, 110, 190];

                              if (keys.includes(e.keyCode) ||
                                    // Allow: Ctrl+A
                                   (e.keyCode == 65 && e.ctrlKey === true) ||
                                    // Allow: Ctrl+C
                                   (e.keyCode == 67 && e.ctrlKey === true) ||
                                    // Allow: Ctrl+X
                                   (e.keyCode == 88 && e.ctrlKey === true) ||
                                    // Allow: home, end, left, right
                                   (e.keyCode >= 35 && e.keyCode <= 39)
                              ) {
                                    return;
                              }

                              if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                  e.preventDefault();
                              }
                        }

                  }
            }
      })


      // notificationStrip ----------------------------------------------------------------------------------------------------------
      // let notificationStrip = document.querySelectorAll('.vp-output-message');
      let notificationStrip = document.querySelectorAll('.notificationStrip');
      // console.log();
      if (notificationStrip.length === 0) {
            let style = document.createElement('style');
            style.setAttribute('id', 'notificationStrip');

            style.innerHTML = `
            .notificationStrip{
                  position:fixed;
                  opacity: 1;
                  top:-100px;
                  left : 0px;
                  z-index:1000000100;
                  width:calc(100%);
                  padding:10px 15px;
                  font-weight: 700;
                  color:#FFF;
            }
            .notificationStrip .container{
                  width:calc(100%);
                  text-align:center;
                  font-weight:200;
                  margin:0 12px
            }
            .notificationStrip .x{
                  padding:1px 10px;
                  font-weight:100;
                  font-family:sans-serif;
                  font-size:15px;
                  position:absolute;
                  right:5px;
                  top:0;
                  cursor:pointer;
                  margin-top:7px
            }`;

            document.head.append(style);

            notificationStrip = document.createElement('div');
            notificationStrip.classList.add('notificationStrip');
      }

      notificationStrip.innerHTML = '<div class="container">...</div><div class="x">x</div>';
      document.body.prepend(notificationStrip);

      notificationStrip.addEventListener('click', (e) => {
            e.target.style.opacity = 0;
            clearaceUIStrip();
      });
})();
