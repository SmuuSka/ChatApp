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
                '''
              }
          }
          stage("Prune Docker data"){
            steps{
                sh 'docker system prune -a --volumes -f'
                }
          }
          stage('Build Stage') {
            environment { 
                MARIADB_ROOT_PASSWORD = credentials('DB_ROOT')
                MARIADB_USER = credentials('DB_USER')
                MARIADB_PASSWORD = credentials('DB_USER_PASS')
                REACT_APP_API_KEY = credentials('APP_API_KEY')
                USER = credentials('DB_USER')
                PASSWORD = credentials('DB_USER_PASS')
                SECRET = credentials('SERVER_SECRET')
                API_KEY = credentials('SERVER_API_KEY')

            }
            steps {
                sh "docker compose build --build-arg REACT_APP_API_KEY='$REACT_APP_API_KEY' --build-arg USER='$USER' --build-arg PASSWORD='$PASSWORD'--build-arg SECRET='$SECRET' --build-arg API_KEY='$API_KEY' --build-arg MARIADB_ROOT_PASSWORD='$MARIADB_ROOT_PASSWORD' --build-arg MARIADB_USER='$MARIADB_USER' --build-arg MARIADB_PASSWORD='$MARIADB_PASSWORD'"
                sh "docker compose up -d"
                sh "docker compose ps"
            }
        }
     }
 }
