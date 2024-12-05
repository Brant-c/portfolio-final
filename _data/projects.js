// Import Axios for making HTTP requests
const axios = require('axios');

/**
 * Fetches project data from the Ghost CMS API and formats it for 11ty.
 * 
 * @returns {Object} - Contains an array of projects, each with:
 *   - title: Project title
 *   - description: Short summary or excerpt
 *   - tech_stack: Array of technology tags
 *   - repo_link: Link to the project post
 *   - overview: Full HTML content of the project post
 *   - feature_image: URL of the project's main image, if available
 */
module.exports = async function() {
  // Define the API URL and access key for Ghost
  const url = 'http://localhost:2368/ghost/api/v3/content/posts/';
  const apiKey = '730ea161611435f2c6e5319496'; 

  try {
    // Fetch all posts from Ghost, including tags
    const response = await axios.get(`${url}?key=${apiKey}&include=tags`);

    // Map the data into a format we want for 11ty
    const projects = response.data.posts.map(post => ({
      title: post.title,                        
      description: post.excerpt,                  
      tech_stack: post.tags.map(tag => tag.name), 
      repo_link: post.url,                        
      overview: post.html,                        
      feature_image: post.feature_image           
    }));

    console.log("Mapped Projects in _data/projects.js:", projects); // For debugging

    // Return the formatted projects
    return { projects };
  } catch (error) {
    console.error('Error fetching projects from Ghost:', error);
    // Return an empty array if there's an error, so it doesn't break 11ty
    return { projects: [] };
  }
};
