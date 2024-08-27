import axios from 'axios';

export const fetchGitHubUser = async (username: string) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching GitHub user:", error);
        throw error;
    }
};
