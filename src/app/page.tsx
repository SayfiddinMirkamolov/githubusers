"use client"; 
// 
import { useState } from 'react';




import { fetchGitHubUser } from '@/app/service/ithubService';

interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
}

export default function Home() {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            setError('');
            const userData = await fetchGitHubUser(username);
            setUser(userData);
        } catch (error) {
            setError('Foydalanuvchi topilmadi.');
            setUser(null);
        }
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>GitHub Foydalanuvchi Qidirish</h1>
            <input
                type="text"
                placeholder="Username kiriting"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: '0.5rem', width: '300px' }}
            />
            <button onClick={handleSearch} style={{ padding: '0.5rem 1rem', marginLeft: '10px' }}>
                Qidirish
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {user && (
                <div style={{ marginTop: '2rem' }}>
                    <img src={user.avatar_url} alt={user.login} style={{ width: '150px', borderRadius: '50%' }} />
                    <h2>
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            {user.login}
                        </a>
                    </h2>
                    <p>Ommaviy reposlar: {user.public_repos}</p>
                    <p>Followers: {user.followers}</p>
                    <p>Following: {user.following}</p>
                </div>
            )}
        </div>
    );
}
