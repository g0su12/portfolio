setTimeout(() => {
    const education = document.getElementById('education');
    education.style.display = 'block';
}, 1000); 

setTimeout(() => {
    const project = document.getElementById('projects');
    project.style.display = 'block';
}, 1000); 

setInterval(() => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
}, 400); 


