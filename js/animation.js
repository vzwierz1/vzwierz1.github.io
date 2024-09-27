

  /* Used AI to animate the spins using the addEventListener */

document.addEventListener('DOMContentLoaded', () => {
    // Select all triangles
    const triangles = document.querySelectorAll('.triangle');

    // Loop through each triangle and add click event listener
    triangles.forEach(triangle => {
        triangle.addEventListener('click', () => {
            triangle.classList.toggle('spin'); // Toggle the 'spin' class on click
        });
    });
});
