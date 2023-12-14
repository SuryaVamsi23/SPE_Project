pipeline
{
    environment{
        frontend = 'splitwise'
        backend_registry = 'spoider/pyth'
        

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



       stage('Stage 2: Testing')
        {
            steps{
                script{
                    dir('splitwise'){
                      sh 'npm install'
                      sh 'npm test'

                    }
                }
            }
        }

        stage('Stage 3: Building frontend Docker image') {
            
             steps {
                 script {
                     dir('splitwise'){
                         frontendimage = docker.build "suryavamsi2312/splitwise_frontend:latest"
                     }
             }   

            // steps {
            //    script{
            //         dir('backend_spe_2'){
            //             // sh '/usr/local/bin/docker build -t '+backend_registry+':v1.0 .'
            //             backendimage = docker.build "suryavamsi2312/splitwise_backend:latest"
            //         }
            //     } 
            //   }

        }
        }

        stage('Stage 4: Building  Backend Docker image') {
            
            //  steps {
            //      script {
            //          dir('splitwise'){
            //              frontendimage = docker.build "suryavamsi2312/splitwise_frontend:latest"
            //          }
            //  }   

            steps {
               script{
                    dir('backend_spe_2'){
                        // sh '/usr/local/bin/docker build -t '+backend_registry+':v1.0 .'
                        backendimage = docker.build "suryavamsi2312/splitwise_backend:latest"
                    }
                } 
              }

        }
        

        stage('Stage 4: Pushing docker images to Dockerhub') {
            steps {
                 script {
                     docker.withRegistry('', 'DockerHubCreds') {
                         frontendimage.push()
                         backendimage.push()
                     }
                 }
             }
           
        }
        
        stage('Stage 5: Clean docker images'){
            steps{
                script{
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }

        stage('Stage 6: Ansible Deployment') {
            steps {
                ansiblePlaybook(
                    becomeUser: null,
                    colorized: true,
                    credentialsId: 'localhost',
                    disableHostKeyChecking: true,
                    installation: 'Ansible',
                    inventory: 'Deployment/inventory',
                    playbook: 'Deployment/deploy.yml',
                    sudoUser: null
                )
            }
            //   steps{
            //     ansiblePlaybook(
            //         becomeUser: null,
            //         colorized: true,
            //         credentialsId: 'localhost',
            //         disableHostKeyChecking: true,
            //         installation: 'Ansible',
            //         inventory: 'Backend_Deploy/inventory.yml',
            //         playbook: 'Backend_Deploy/Deploy.yml',
            //         sudoUser: null
            //     )
            //  }
        }

    }

}