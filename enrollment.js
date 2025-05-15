document.addEventListener('DOMContentLoaded', function() {
    // Sample enrollment data - in a real app, this would come from an API
    const enrollments = {
        current: [
            {
                id: 1,
                courseId: 2,
                title: "Data Structures and Algorithms",
                instructor: "Prof. Michael Chen",
                schedule: "Tue/Thu 2:00 PM - 3:30 PM",
                credits: 4,
                enrollmentDate: "2023-09-15",
                status: "Enrolled",
                progress: 35,
                grade: null,
                canDrop: true
            },
            {
                id: 2,
                courseId: 6,
                title: "Mobile App Development",
                instructor: "Dr. Lisa Park",
                schedule: "Tue/Thu 4:00 PM - 5:30 PM",
                credits: 4,
                enrollmentDate: "2023-09-15",
                status: "Enrolled",
                progress: 20,
                grade: null,
                canDrop: true
            }
        ],
        completed: [
            {
                id: 3,
                courseId: 1,
                title: "Introduction to Web Development",
                instructor: "Dr. Sarah Johnson",
                schedule: "Mon/Wed 10:00 AM - 11:30 AM",
                credits: 3,
                enrollmentDate: "2023-01-10",
                completionDate: "2023-05-15",
                status: "Completed",
                progress: 100,
                grade: "A",
                canDrop: false
            }
        ],
        waitlist: [
            {
                id: 4,
                courseId: 4,
                title: "Artificial Intelligence Basics",
                instructor: "Prof. David Kim",
                schedule: "Sat 9:00 AM - 12:00 PM",
                credits: 4,
                enrollmentDate: "2023-09-20",
                status: "Waitlisted (Position #3)",
                progress: 0,
                grade: null,
                canDrop: true
            }
        ]
    };

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
            
            // Load the appropriate data
            loadEnrollments(tabId);
        });
    });
    
    // Load initial data
    loadEnrollments('current');
    
    function loadEnrollments(type) {
        const enrollmentList = document.querySelector(`#${type} .enrollment-list`);
        enrollmentList.innerHTML = '';
        
        if (enrollments[type].length === 0) {
            enrollmentList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-open"></i>
                    <p>You don't have any ${type} enrollments.</p>
                    ${type === 'current' ? '<a href="courses.html" class="btn">Browse Courses</a>' : ''}
                </div>
            `;
            return;
        }
        
        enrollments[type].forEach(enrollment => {
            const enrollmentItem = document.createElement('div');
            enrollmentItem.className = 'enrollment-item';
            
            let progressBar = '';
            if (type === 'current') {
                progressBar = `
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${enrollment.progress}%"></div>
                        <span>${enrollment.progress}% complete</span>
                    </div>
                `;
            }
            
            let gradeInfo = '';
            if (type === 'completed' && enrollment.grade) {
                gradeInfo = `
                    <div class="grade-info">
                        <span>Final Grade: </span>
                        <span class="grade ${enrollment.grade.toLowerCase()}">${enrollment.grade}</span>
                    </div>
                `;
            }
            
            enrollmentItem.innerHTML = `
                <div class="enrollment-header">
                    <h3>${enrollment.title}</h3>
                    <span class="status ${enrollment.status.toLowerCase().replace(/[^a-z]/g, '')}">${enrollment.status}</span>
                </div>
                <div class="enrollment-details">
                    <p><i class="fas fa-chalkboard-teacher"></i> ${enrollment.instructor}</p>
                    <p><i class="fas fa-calendar-alt"></i> ${enrollment.schedule}</p>
                    <p><i class="fas fa-star"></i> ${enrollment.credits} credits</p>
                    <p><i class="fas fa-calendar-check"></i> Enrolled on ${enrollment.enrollmentDate}</p>
                    ${type === 'completed' ? `<p><i class="fas fa-graduation-cap"></i> Completed on ${enrollment.completionDate}</p>` : ''}
                </div>
                ${progressBar}
                ${gradeInfo}
                <div class="enrollment-actions">
                    ${enrollment.canDrop ? `<button class="btn btn-outline drop-btn" data-id="${enrollment.id}">Drop Course</button>` : ''}
                    <button class="btn view-btn" data-id="${enrollment.courseId}">View Course</button>
                </div>
            `;
            
            enrollmentList.appendChild(enrollmentItem);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.drop-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const enrollmentId = this.getAttribute('data-id');
                dropEnrollment(enrollmentId, type);
            });
        });
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = this.getAttribute('data-id');
                viewCourse(courseId);
            });
        });
    }
    
    function dropEnrollment(enrollmentId, type) {
        if (confirm('Are you sure you want to drop this course?')) {
            // In a real app, this would make an API call
            alert(`Dropping enrollment ID: ${enrollmentId}`);
            // Then reload the enrollments
            loadEnrollments(type);
        }
    }
    
    function viewCourse(courseId) {
        // In a real app, this would navigate to the course details
        alert(`Viewing course ID: ${courseId}`);
    }
});