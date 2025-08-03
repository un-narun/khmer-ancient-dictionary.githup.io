
        // Sample data in Khmer
        const khmerData = [
            { title: "កុ", 		description: "នារី​អ្នក​បម្រើ" },
			{ title: "វា", 		description: "បុរសអ្នក​បម្រើ" },
			{ title: "ត្មុរ៑", 		description: "សត្វគោ" },
          
		  
		  
        ];
	

      // Pagination variables
        let currentPage = 1;
        const itemsPerPage = 10
        let filteredData = [...khmerData];

        // Initialize the list
        function initializeList() {
            renderList();
            updatePagination();
        }

        // Render the list based on current page and filter
        function renderList() {
            const listContainer = document.getElementById('listContainer');
            listContainer.innerHTML = '';
            
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentItems = filteredData.slice(startIndex, endIndex);
            
            currentItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'list-item';
                itemElement.textContent = item.title;
                itemElement.onclick = function() {
                    showDescription(this, item.description);
                };
                listContainer.appendChild(itemElement);
            });
        }

        // Show description when item is clicked
        function showDescription(element, description) {
            // Remove active class from all items
            document.querySelectorAll('.list-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            element.classList.add('active');
            
            // Remove any existing description
            const existingDesc = document.querySelector('.description');
            if (existingDesc) {
                existingDesc.remove();
            }
            
            // Create and append description
            const descElement = document.createElement('div');
            descElement.className = 'description';
            descElement.textContent = description;
            element.parentNode.insertBefore(descElement, element.nextSibling);
            
            // Show the description
            setTimeout(() => {
                descElement.style.display = 'block';
            }, 10);
        }

        // Filter the list based on search input
        function filterList() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase();
            filteredData = khmerData.filter(item => 
                item.title.toLowerCase().includes(searchInput) || 
                item.description.toLowerCase().includes(searchInput)
            );
            
            currentPage = 1;
            renderList();
            updatePagination();
        }

        // Go to next page
        function nextPage() {
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderList();
                updatePagination();
            }
        }

        // Go to previous page
        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderList();
                updatePagination();
            }
        }

        // Update pagination controls
        function updatePagination() {
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            document.getElementById('pageInfo').textContent = `ទំព័រ ${currentPage} នៃ ${totalPages}`;
            
            document.getElementById('prevBtn').disabled = currentPage === 1;
            document.getElementById('nextBtn').disabled = currentPage === totalPages;
        }

        // Initialize when page loads
        window.onload = initializeList;