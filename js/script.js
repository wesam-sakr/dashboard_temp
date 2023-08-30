// replace text
$.fn.toggleText = function(t1, t2){
  if(this.text() == t1){
    this.text(t2);
  }else{                   
    this.text(t1);
  }
  return this;
};

// dir
var bodyDir = $('body').css('direction')
console.log(bodyDir)
var dir
if(bodyDir == "rtl"){
  dir= true
}
else{
  dir = false
}

// toggle nav
$('.toggle-nav-btn').click(function(){
  $('.toggle-nav-btn i').toggleClass('fa-bars fa-xmark');
  $('.nav-dash').toggleClass('nav-toggle');
})

$(document).ready(function () {
  // loading
  setTimeout(function () {
    $("#loading").fadeOut();
  }, 3000);

  // verify code
  const inputElements = [...document.querySelectorAll('input.code')]
  inputElements.forEach((ele,index)=>{
    ele.addEventListener('keydown',(e)=>{
      // if the keycode is backspace & the current field is empty
      // focus the input before the current. Then the event happens
      // which will clear the "before" input box.
      if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
    })
    ele.addEventListener('input',(e)=>{
        inputElements[index].focus()
      // take the first character of the input
      // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
      // but I'm willing to overlook insane security code practices.
      const [first,...rest] = e.target.value
      e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
      const lastInputBox = index===inputElements.length-1
      const didInsertContent = first!==undefined
      if(didInsertContent && !lastInputBox) {
        // continue to input the rest of the string
        inputElements[index+1].focus()
        inputElements[index+1].value = rest.join('')
        inputElements[index+1].dispatchEvent(new Event('input'))
      }
    })
  })

  // file input
  $('.file-input').change(function(){
    const fileInput = $(this).find('[type="file"]')[0];
    const label = $(this).find('[data-js-label]')[0];
    console.log($(fileInput).val());
    if (!$(fileInput).val()) return
      var value = $(fileInput).val().replace(/^.*[\\\/]/, '')
      $(label).html(value)
  })

  // textarea
  var $txtArea = $('textarea');
  $txtArea.on('keyup', countChar);
  function countChar() {
    var id =$(this).attr("id") ;
    var chars = $(this).next("span");
    var textMax = $(this).attr('maxlength');
    var textLength = $(this).val().length;
    var textRemaining = textLength;
    chars.html(textMax + ' /' + textRemaining);
  };

  // show pass
  $(".show-pass").click(function () {
    $(this).find('i').toggleClass("fa-eye-slash fa-eye");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
    $(this).toggleClass('active');
  });

  // servType
  $('input[name="servType"]').change(function(){
    var servTypeId = $(this).attr('id');
    if ( servTypeId == 'partial'){
      $('.partial').show(200)
    }
    else{
      $('.partial').hide(200)
    }
  })

  // servTypeVal
  $('input[name="servTypeVal"]').change(function(){
    var servTypeValId = $(this).attr('id');
    $('.servTypeVal').each(function(){
      if ($(this).hasClass(servTypeValId)){
        $(this).show()
      }
      else{
        $(this).hide()
      }
    })
  })
})

// change profile pic
const imgDiv = document.querySelector('.profile-pic');
const alt = document.querySelector('.alt');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');
//if user hover on img div
imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});
//if we hover out from img div
imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});
//when we choose a pic to upload
file.addEventListener('change', function(){
const choosedFile = this.files[0];
if (choosedFile) {
    const reader = new FileReader();
    reader.addEventListener('load', function(){
        img.setAttribute('src', reader.result);
        img.style.display="block";
        alt.style.display="none"
    });
    reader.readAsDataURL(choosedFile);
}
});


// niceSelect
// $('select').niceSelect();

// wow.js init
new WOW().init();



