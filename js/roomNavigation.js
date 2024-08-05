document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const itemsPerPage = 4;
    const rooms = document.querySelectorAll('.room');
    const totalPages = Math.ceil(rooms.length / itemsPerPage);

    function showPage(page) {
        rooms.forEach((room, index) => {
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                room.style.display = 'flex';
            } else {
                room.style.display = 'none';
            }
        });
        document.querySelector('.room-left-button').disabled = page === 1;
        document.querySelector('.room-right-button').disabled = page === totalPages;
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    }

    // Attach the functions to the global scope so they can be called from the HTML
    window.nextPage = nextPage;
    window.previousPage = previousPage;

    // Initial page load
    showPage(currentPage);
});