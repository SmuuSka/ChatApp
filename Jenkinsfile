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
            environment {
                MARIADB_ROOT_PASSWORD = credentials('DB_ROOT_PASSWD')
                MARIADB_USER = credentials('DB_USER')
                MARIADB_USER_PASSWORD = credentials('DB_USER_PASSWD')

            }
            steps{
                sh 'docker compose build --build-arg MARIADB_ROOT_PASSWORD='$DB_ROOT_PASSWD' --build-arg MARIADB_USER='$DB_USER' --build-arg MARIADB_PASSWORD='$DB_USER_PASSWD' --detach --verbose'
                sh 'docker compose up -d'
                sh 'docker compose ps'
            }
        }
    }
