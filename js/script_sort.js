window.addEventListener('DOMContentLoaded', function(){

  // ====================
  // Definition
  // ====================
  const animationClassNamePrefix = 'animation-';
  const sortButtons = document.querySelectorAll('.js-sort-btn');
  const sortItems = document.querySelectorAll('.js-sort-item');
  sortItems_array = Array.prototype.slice.call(sortItems);

  // ====================
  // Animation
  // ====================
  // Make keyframe and return animation class
  const returnAnimation = function(animation_class, animation_name, animation_delay){
    const animation_rule = `
      .${animation_class}{
        animation: ${animation_name} 0.4s ease-in-out ${animation_delay} both;
      }
      @keyframes ${animation_name} {
        0% {
          transform: translateY(30px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }`
    
      return animation_rule;
  }

  // Initialize CSS animation rule string
  let rules = '';
  const start_delay_control = 10;

  // Add animation class into all elements (class='js-sort-item')
  for(let i=0; i<sortItems.length; i++) {
    const animation_class = animationClassNamePrefix + i;
    const animation_name = animationClassNamePrefix + i;
    const animation_delay = i / start_delay_control + 's';

    sortItems[i].classList.add(animation_class);

    rules += `${returnAnimation(animation_class, animation_name, animation_delay)}`;
  }

  const s = document.createElement('style');
  s.innerHTML = rules;
  document.getElementsByTagName('head')[0].appendChild(s);
  

  // ====================
  // Operation
  // ====================
  for(let sortButton of sortButtons) {
    sortButton.addEventListener('click', function(){
      
      // Sorting
      if(!this.classList.contains('selected')){
        // Show all items
        for(let i=0; i<sortItems.length; i++){
          sortItems[i].style.setProperty('display', 'block');
          sortItems[i].classList.remove(animationClassNamePrefix + i);
        }
        
        if(this.dataset.category != 'all'){
          // Not match
          var hiddenSelector = '.js-sort-item:not([data-category~="'+ this.dataset.category + '"])';
          const hiddenItems = document.querySelectorAll(hiddenSelector);
          for(let hiddenItem of hiddenItems){
            hiddenItem.style.setProperty('display', 'none');
          }

          // Match
          var showSelector = '.js-sort-item[data-category~="'+ this.dataset.category + '"]';
          const showItems = document.querySelectorAll(showSelector);
          showItems_array = Array.prototype.slice.call(showItems);
          for(let showItem of showItems){
            const index = showItems_array.indexOf(showItem);
            showItem.classList.add(animationClassNamePrefix + index);
          }
        } else {
          for(let i=0; i<sortItems.length; i++){
            sortItems[i].classList.add(animationClassNamePrefix + i);
          }
        }
      }
      
      // Get element having class('selected') and remove that class
      let elementSelected = document.getElementsByClassName('js-sort-btn selected');
      elementSelected[0].classList.remove('selected');

      // Add class('selected') to this
      this.classList.add('selected');
    });
  }

  // Animationend event
  for(let i=0; i<sortItems.length; i++) {
    sortItems[i].addEventListener('animationend', function(){
      let classes = sortItems[i].classList;
      classes_array = Array.prototype.slice.call(classes);
      animation_class = classes_array.find((element) => element.match(/^animation-?\d{1}/));
      sortItems[i].classList.remove(animation_class);
    });
  }

});