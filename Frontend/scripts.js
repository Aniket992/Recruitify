// Define job listings and recommended jobs
const jobListings = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Acme Inc.',
      location: 'New York, NY',
      category: 'Engineering'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      company: 'Acme Inc.',
      location: 'Los Angeles, CA',
      category: 'Marketing'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Acme Inc.',
      location: 'Chicago, IL',
      category: 'Data'
    }
  ];
  
  const recommendedJobs = [
    {
      id: 4,
      title: 'Product Manager',
      company: 'Acme Inc.',
      location: 'San Francisco, CA',
      category: 'Product'
    },
    {
      id: 5,
      title: 'UX Designer',
      company: 'Acme Inc.',
      location: 'New York, NY',
      category: 'Design'
    }
  ];
  
  // Get DOM elements
  const jobListingsSection = document.getElementById('job-listings');
  const recommendedJobsSection = document.getElementById('recommended-jobs');
  const jobCategoryFilter = document.getElementById('job-category-filter');
  
  // Function to display job listings
  function displayJobListings(jobs) {
    jobListingsSection.innerHTML = '';
    jobs.forEach(job => {
      const jobItem = document.createElement('div');
      jobItem.classList.add('job-item');
      jobItem.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <p>${job.location}</p>
        <p>${job.category}</p>
      `;
      jobListingsSection.appendChild(jobItem);
    });
  }
  
  // Function to display recommended jobs
  function displayRecommendedJobs(jobs) {
    recommendedJobsSection.innerHTML = '';
    jobs.forEach(job => {
      const jobItem = document.createElement('div');
      jobItem.classList.add('job-item');
      jobItem.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <p>${job.location}</p>
        <p>${job.category}</p>
      `;
      recommendedJobsSection.appendChild(jobItem);
    });
  }
  
  // Function to filter job listings by category
  function filterJobListings(category) {
    if (category === 'all') {
      displayJobListings(jobListings);
    } else {
      const filteredJobs = jobListings.filter(job => job.category === category);
      displayJobListings(filteredJobs);
    }
  }
  
  // Initial display of job listings and recommended jobs
  displayJobListings(jobListings);
  displayRecommendedJobs(recommendedJobs);
  
  // Event listener for job category filter
  jobCategoryFilter.addEventListener('change', () => {
    const category = jobCategoryFilter.value;
    filterJobListings(category);
  });