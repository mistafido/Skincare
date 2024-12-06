const tl = gsap.timeline(
    {
        defaults: {
            duration: 0.75, 
            ease: "Power3.easeOut"
        }
    })

tl.fromTo(
    '.hero-img', 
    { scale: 1.3, borderRadius: "0rem"}, 
    {
        scale: 1,
        borderRadius: "2rem",
        delay: 0.35,
        duration: 2.5,
        ease: "elastic.out(1.5,1)"
    })

tl.fromTo( ".cta1", { x: "100%", opcaity: 0.5 }, { x: 0, opcaity: 1 }, "<20%");
tl.fromTo( ".cta3", { x: "-100%", opcaity: 0.5 }, { x: 0, opcaity: 1 }, "<20%");
tl.fromTo( ".cta2", { y: "100%", opcaity: 0.5 }, { y: 0, opcaity: 1 }, "<20%");
tl.fromTo( ".cta4", { x: "100%", opcaity: 0.5 }, { x: 0, opcaity: 1 }, "<20%");
tl.fromTo( ".cta6", { x: "-100%", opcaity: 0.5 }, { x: 0, opcaity: 1 }, "<20%");
tl.fromTo( ".cta5", { y: "100%", opcaity: 0.5 }, { y: 0, opcaity: 1 }, "<20%");

tl.fromTo('.cta-btn', {y: 20, opcaity: 0}, { y: 0, opcaity: 1}, "<20%");

//Split text alternative
const logo = document.querySelector('.logo');
const letters = logo.textContent.split("");

logo.textContent = "";

letters.forEach((letter) => {
    logo.innerHTML += '<span class="letter">' + letter + "</span>";
})

gsap.set('.letter', {dispay: "inline-block"});
gsap.fromTo(".letter", { y: "100%" }, { y: 0, delay: 2, stagger: 0.05, ease: "back.out(3)" })


//Contact.html js
const containers = document.querySelectorAll('.input-container')
const form = document.querySelector('form');

const tl2 = gsap.timeline({defaults: {duration: 1}})

//line 
const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end = 'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512';

//Elastic Effect
containers.forEach(container => {
    const input = container.querySelector('.input');
    const line = container.querySelector('.elastic-line');
    const placeholder = container.querySelector('.placeholder');

    input.addEventListener('focus', () => {
        if(!input.value) {
            tl2.fromTo(line, {attr: {d: start}}, {attr: {d: end}, ease: 'Power2.easeOut', duration: 0.75});
            tl2.to(line, {attr: {d:start}, ease: 'elastic.out(3,0.5'},'<50%');
            //Placeholder Shift
            tl2.to(placeholder, {top: -15, left: 0, scale: 0.7, duration: 0.5, ease: "Power2.easeOut",},'<15%')
        }
    })
});

form.addEventListener('click', () => {
    containers.forEach(container => {
        const input = container.querySelector('.input');
        const line = container.querySelector('.elastic-line');
        const placeholder = container.querySelector('.placeholder');

        if(document.activeElement !== input) {
            if(!input.value) {
                gsap.to(placeholder, {top: 0, left: 0, scale: 1, duration: 0.5, ease: "Power2.easeOut"})
            }
        }
        //Name Validation
        input.addEventListener('input', (e) => {
            if(e.target.type === 'text') {
                let inputText = e.target.value;
                if(inputText > 5) {
                    colorize('#6391e8', line, placeholder)
                } else {
                    colorize('#FE8C99', line, placeholder)
                }
            }
            //Email Validation
            if(e.target.type === 'email') {
                let valid = validateEmail(e.target.value);
                if(valid) {
                    colorize('#6391e8', line, placeholder)
                } else {
                    colorize('#FE8C99', line, placeholder)
                }
            }
            //Phone Validation
            if(e.target.type === 'tel') {
                let valid = validatePhone(e.target.value);
                if(valid) {
                    colorize('#6391e8', line, placeholder)
                } else {
                    colorize('#FE8C99', line, placeholder)
                }
            }
        })
        
    })
})


//checking email validation
function validateEmail(email) {
    let re = /\S+@\S+\.\S+/
    return re.test(email)
}


function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }

function colorize(color, line, placeholder) {
    gsap.to(line, {stroke: color, duration: 0.75})
    gsap.to(placeholder,{color: color, duration: 0.75})
}

//Checkbox animation fill
const checkbox = document.querySelector('.checkbox');
const tl3 = gsap.timeline({defaults: { duration: 0.5, ease: 'Power2.easeOut'}});
const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath, {strokeDashofset: pathLength, strokeDasharray: pathLength });

checkbox.addEventListener('click', () => {
    if(checkbox.checked) {
        tl3.to('.checkbox-fill', {top: '0%'})
        tl3.fromTo(tickMarkPath, {strokeDashofset: pathLength}, {strokeDashofset: 0})
    } else {
        tl3.to()
    }
})