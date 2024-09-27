

  /* Used AI to animate the spins using the addEventListener */
document.addEventListener('DOMContentLoaded', () => {

    const triangles = document.querySelectorAll('.triangle');
    triangles.forEach(triangles => {
        triangles.addEventListener('loopingTriangle', () => {
            triangles.classList.toggle('spinning'); 
        });
    });
});
