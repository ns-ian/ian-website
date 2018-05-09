module.exports = {
  apps: [{
    name: 'ian-website',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '18.218.147.38',
      key: '~/.ssh/ian-key.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ns-ian/ian-website.git',
      path: '/home/ubuntu/ian-website',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
