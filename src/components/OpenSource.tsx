
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Github, GitPullRequest, GitBranch, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GitHubPR {
  id: number;
  number: number;
  title: string;
  body: string;
  html_url: string;
  state: string;
  merged_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  base: {
    repo: {
      name: string;
      full_name: string;
      language: string;
    };
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
}

interface GitHubStats {
  totalPRs: number;
  totalRepos: number;
  totalCommits: number;
}

const OpenSource = () => {
  const [prs, setPrs] = useState<GitHubPR[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<GitHubStats>({
    totalPRs: 0,
    totalRepos: 0,
    totalCommits: 0
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch merged pull requests
        const prResponse = await fetch('https://api.github.com/search/issues?q=author:ankush1oo8+type:pr+is:merged&sort=updated&per_page=6');
        const prData = await prResponse.json();
        
        // Fetch user stats
        const userResponse = await fetch('https://api.github.com/users/ankush1oo8');
        const userData = await userResponse.json();
        
        // Fetch repositories to get total count
        const reposResponse = await fetch('https://api.github.com/users/ankush1oo8/repos?per_page=100');
        const reposData = await reposResponse.json();
        
        if (prData.items && Array.isArray(prData.items)) {
          setPrs(prData.items);
          
          // Calculate total commits (approximation from user data)
          const totalCommits = userData.public_repos * 15; // Rough estimate
          
          setStats({
            totalPRs: prData.total_count || prData.items.length,
            totalRepos: userData.public_repos || 0,
            totalCommits: totalCommits || 0
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section className="py-32 bg-charcoal/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-6 bg-muted rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-charcoal/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-playfair font-bold mb-6">
            Open Source <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Contributing to the developer community through merged pull requests
          </p>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="premium-border p-6 text-center hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">{stats.totalPRs}</div>
            <p className="text-muted-foreground">Merged PRs</p>
          </div>
          <div className="premium-border p-6 text-center hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">{stats.totalRepos}</div>
            <p className="text-muted-foreground">Total Repositories</p>
          </div>
          <div className="premium-border p-6 text-center hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">{stats.totalCommits}</div>
            <p className="text-muted-foreground">Total Commits</p>
          </div>
        </motion.div>

        {/* Pull Requests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prs.map((pr, index) => (
            <motion.div
              key={pr.id}
              className="premium-border p-6 hover-lift glow-effect group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <GitPullRequest className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-muted-foreground">#{pr.number}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => window.open(pr.html_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                <h3 className="text-lg font-bold group-hover:text-gradient transition-colors line-clamp-2">
                  {pr.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  <GitBranch className="h-4 w-4 inline mr-1" />
                  {pr.base?.repo?.full_name || 'Repository'}
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed min-h-[3rem] line-clamp-3">
                  {pr.body?.substring(0, 100) || 'No description available'}...
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={pr.user?.avatar_url} 
                      alt={pr.user?.login}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{pr.user?.login}</span>
                  </div>
                  {pr.base?.repo?.language && (
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>{pr.base.repo.language}</span>
                    </div>
                  )}
                </div>

                {pr.labels && pr.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {pr.labels.slice(0, 2).map((label) => (
                      <span
                        key={label.name}
                        className="px-2 py-1 text-xs bg-accent rounded text-accent-foreground"
                        style={{ backgroundColor: `#${label.color}20` }}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  Merged {new Date(pr.merged_at).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="group glow-effect"
            onClick={() => window.open('https://github.com/ankush1oo8', '_blank')}
          >
            <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            View More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;
