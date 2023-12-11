pipeline{
    environment{
        frontend = 'splitwise_backend'
        backend = ''

    }

    agent any

    stages {
        stage('Stage 1: Git pull')
        {
            steps{

                git branch: 'master',
                url: 'https://github.com/SuryaVamsi23/SPE_Project.git'

            }
        }
    }
}