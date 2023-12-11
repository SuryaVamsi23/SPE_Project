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

                dir('splitwise') {
                    sh "docker build -t SuryaVamsi/${frontend} ."
                }
            }
        }

    }
}