/**
 * Projects Data Service
 * Handles loading and managing project data from JSON
 */
class ProjectsDataService {
    constructor() {
        this.projects = [];
        this.isLoaded = false;
        this.loadPromise = null;
    }

    /**
     * Load projects data from JSON file
     * @returns {Promise<Array>} Array of project objects
     */
    async loadProjects() {
        // Return existing promise if already loading
        if (this.loadPromise) {
            return this.loadPromise;
        }

        // Return cached data if already loaded
        if (this.isLoaded) {
            return this.projects;
        }

        this.loadPromise = this._fetchProjects();
        return this.loadPromise;
    }

    /**
     * Private method to fetch projects from JSON
     * @returns {Promise<Array>} Array of project objects
     */
    async _fetchProjects() {
        try {
            const response = await fetch('data/projects.json');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            // Validate data structure
            if (!data || !Array.isArray(data.projects)) {
                throw new Error('Invalid projects data structure');
            }

            this.projects = data.projects;
            this.isLoaded = true;

            console.log(`✅ Loaded ${this.projects.length} projects`);
            return this.projects;

        } catch (error) {
            console.error('❌ Error loading projects:', error);
            
            // Return fallback data or empty array
            this.projects = this._getFallbackProjects();
            this.isLoaded = true;
            
            return this.projects;
        }
    }

    /**
     * Get fallback projects in case of loading failure
     * @returns {Array} Fallback project data
     */
    _getFallbackProjects() {
        console.warn('⚠️ Using fallback project data');
        return [
            {
                id: 'fallback-project',
                title: 'Proyecto de Muestra',
                description: 'Proyecto de ejemplo mientras se cargan los datos.',
                image: 'images/contexto_concrete.webp',
                alt: 'Proyecto de Muestra',
                translateKeys: {
                    title: 'fallback-title',
                    description: 'fallback-desc'
                }
            }
        ];
    }

    /**
     * Get project by ID
     * @param {string} id - Project ID
     * @returns {Object|null} Project object or null if not found
     */
    getProjectById(id) {
        return this.projects.find(project => project.id === id) || null;
    }

    /**
     * Get all projects
     * @returns {Array} Array of all projects
     */
    getAllProjects() {
        return this.projects;
    }

    /**
     * Add a new project (for future dynamic content management)
     * @param {Object} project - Project object
     * @returns {boolean} Success status
     */
    addProject(project) {
        try {
            // Validate required fields
            if (!project.id || !project.title || !project.image) {
                throw new Error('Project must have id, title, and image');
            }

            // Check for duplicate ID
            if (this.getProjectById(project.id)) {
                throw new Error(`Project with ID '${project.id}' already exists`);
            }

            this.projects.push(project);
            console.log(`✅ Added project: ${project.title}`);
            return true;

        } catch (error) {
            console.error('❌ Error adding project:', error);
            return false;
        }
    }

    /**
     * Remove project by ID (for future dynamic content management)
     * @param {string} id - Project ID
     * @returns {boolean} Success status
     */
    removeProject(id) {
        const index = this.projects.findIndex(project => project.id === id);
        
        if (index !== -1) {
            const removed = this.projects.splice(index, 1)[0];
            console.log(`✅ Removed project: ${removed.title}`);
            return true;
        }

        console.warn(`⚠️ Project with ID '${id}' not found`);
        return false;
    }
}

// Create global instance
window.projectsDataService = new ProjectsDataService();
