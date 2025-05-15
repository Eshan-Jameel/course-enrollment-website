document.addEventListener('DOMContentLoaded', function() {
    // Sample course data - in a real app, this would come from an API
    const courses = [
        {
            id: 1,
            title: "Introduction to Web Development",
            department: "Computer Science",
            level: "Beginner",
            description: "Learn the fundamentals of HTML, CSS, and JavaScript to build your first websites.",
            instructor: "Dr. Sarah Johnson",
            schedule: "Mon/Wed 10:00 AM - 11:30 AM",
            timeCategory: "morning",
            credits: 3,
            seatsAvailable: 15,
            prerequisites: "None",
            image: "images/web-dev.jpg"
        },
        {
            id: 2,
            title: "Data Structures and Algorithms",
            department: "Computer Science",
            level: "Intermediate",
            description: "Master essential data structures and algorithms for efficient problem solving.",
            instructor: "Prof. Michael Chen",
            schedule: "Tue/Thu 2:00 PM - 3:30 PM",
            timeCategory: "afternoon",
            credits: 4,
            seatsAvailable: 10,
            prerequisites: "Intro to Programming",
            image: "images/dsa.jpg"
        },
        {
            id: 3,
            title: "Digital Marketing Fundamentals",
            department: "Business",
            level: "Beginner",
            description: "Explore SEO, social media marketing, email campaigns, and analytics.",
            instructor: "Dr. Emily Wilson",
            schedule: "Wed/Fri 6:00 PM - 7:30 PM",
            timeCategory: "evening",
            credits: 3,
            seatsAvailable: 20,
            prerequisites: "None",
            image: "images/digital-marketing.jpg"
        },
        {
            id: 4,
            title: "Artificial Intelligence Basics",
            department: "Computer Science",
            level: "Advanced",
            description: "Introduction to machine learning, neural networks, and AI applications.",
            instructor: "Prof. David Kim",
            schedule: "Sat 9:00 AM - 12:00 PM",
            timeCategory: "weekend",
            credits: 4,
            seatsAvailable: 8,
            prerequisites: "Python Programming, Statistics",
            image: "images/ai.jpg"
        },
        {
            id: 5,
            title: "Financial Accounting",
            department: "Business",
            level: "Beginner",
            description: "Learn the principles of financial accounting and financial statement analysis.",
            instructor: "Prof. Robert Taylor",
            schedule: "Mon/Wed 1:00 PM - 2:30 PM",
            timeCategory: "afternoon",
            credits: 3,
            seatsAvailable: 18,
            prerequisites: "None",
            image: "images/accounting.jpg"
        },
        {
            id: 6,
            title: "Mobile App Development",
            department: "Computer Science",
            level: "Intermediate",
            description: "Build cross-platform mobile applications using modern frameworks.",
            instructor: "Dr. Lisa Park",
            schedule: "Tue/Thu 4:00 PM - 5:30 PM",
            timeCategory: "afternoon",
            credits: 4,
            seatsAvailable: 12,
            prerequisites: "JavaScript Fundamentals",
            image: "images/mobile-dev.jpg"
        }
    ];

    const coursesGrid = document.querySelector('.courses-grid');
    
    // Display all courses initially
    displayCourses(courses);
    
    // Filter functionality
    const searchInput = document.querySelector('.search-bar input');
    const departmentFilter = document.getElementById('department');
    const levelFilter = document.getElementById('level');
    const scheduleFilter = document.getElementById('schedule');
    
    searchInput.addEventListener('input', filterCourses);
    departmentFilter.addEventListener('change', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
    scheduleFilter.addEventListener('change', filterCourses);
    
    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const departmentValue = departmentFilter.value;
        const levelValue = levelFilter.value;
        const scheduleValue = scheduleFilter.value;
        
        const filteredCourses = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm) || 
                                 course.description.toLowerCase().includes(searchTerm) ||
                                 course.instructor.toLowerCase().includes(searchTerm);
            const matchesDepartment = !departmentValue || course.department.toLowerCase().replace(/\s+/g, '-') === departmentValue;
            const matchesLevel = !levelValue || course.level.toLowerCase() === levelValue;
            const matchesSchedule = !scheduleValue || course.timeCategory === scheduleValue;
            
            return matchesSearch && matchesDepartment && matchesLevel && matchesSchedule;
        });
        
        displayCourses(filteredCourses);
    }
    
    function displayCourses(coursesToDisplay) {
        coursesGrid.innerHTML = '';
        
        if (coursesToDisplay.length === 0) {
            coursesGrid.innerHTML = '<p class="no-results">No courses match your search criteria.</p>';
            return;
        }
        
        coursesToDisplay.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                    <span class="seats">${course.seatsAvailable} seats left</span>
                </div>
                <div class="course-details">
                    <div class="course-header">
                        <h3>${course.title}</h3>
                        <span class="department">${course.department}</span>
                    </div>
                    <p class="instructor">Instructor: ${course.instructor}</p>
                    <p class="description">${course.description}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-chart-line"></i> ${course.level}</span>
                        <span><i class="fas fa-clock"></i> ${course.schedule}</span>
                        <span><i class="fas fa-star"></i> ${course.credits} credits</span>
                    </div>
                    <div class="course-actions">
                        <button class="btn btn-outline view-details" data-id="${course.id}">Details</button>
                        <button class="btn enroll-btn" data-id="${course.id}">Enroll Now</button>
                    </div>
                </div>
            `;
            coursesGrid.appendChild(courseCard);
        });
        
        // Add event listeners to the new buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const courseId = this.getAttribute('data-id');
                viewCourseDetails(courseId);
            });
        });
        
        document.querySelectorAll('.enroll-btn').forEach(button => {
            button.addEventListener('click', function() {
                const courseId = this.getAttribute('data-id');
                enrollInCourse(courseId);
            });
        });
    }
    
    function viewCourseDetails(courseId) {
        // In a real app, this would show a modal or navigate to a details page
        alert(`Viewing details for course ID: ${courseId}`);
    }
    
    function enrollInCourse(courseId) {
        // In a real app, this would check eligibility and process enrollment
        alert(`Attempting to enroll in course ID: ${courseId}`);
    }
});