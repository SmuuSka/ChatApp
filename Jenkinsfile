pipeline {
    agent any
    stages {
        stage("verify tooling"){
            steps {
                sh'''
                    whoami
                    apt-get update
                    apt-get install ca-certificates curl gnupg
                    curl -fsSL https://get.docker.com -o get-docker.sh
                    sh ./get-docker.sh
                    docker version
                    docker info
                    docker compose version
                    curl --version
                    jq --version
                '''
              }
          }
          stage("Prune Docker data"){
            steps{
                sh 'docker system prune -a --volumes -f'
                }
          }
          stage('Start container'){
            steps{
                sh 'docker compose up -d --build'
                sh 'docker compose ps'
                }
            }
        }
    }