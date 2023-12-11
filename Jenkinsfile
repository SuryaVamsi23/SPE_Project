pipeline{
    environment{
        frontend = 'splitwise'
        backend = ''

    }

    agent any

    stages {
        stage('Stage 1: Git pull')
        {
            steps{

                git branch: 'main',
                url: 'https://github.com/SuryaVamsi23/SPE_Project.git'

            }
        }

        
        stage('Stage 2: Building frontend Docker image') {
            
            steps {
                script {
                    dir('splitwise'){
                        frontendimage = docker.build "suryavamsi2312/splitwise_frontend:latest"
                    }
                }   
            }
        }

        stage('Stage 3: Pushing docker images to Dockerhub') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCreds') {
                        frontendimage.push()
                    }
                }
            }
        }
        
        stage('Stage 4: Clean docker images'){
            steps{
                script{
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }

    }
}