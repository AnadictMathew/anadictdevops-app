pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_REPO = "143471984651.dkr.ecr.ap-south-1.amazonaws.com/angular-app"
    GITOPS_REPO = "https://github.com/AnadictMathew/anadictdevops-gitops.git"
  }

  stages {

    stage("Read Version") {
      steps {
        script {
          VERSION = readFile("VERSION").trim()
          IMAGE_TAG = "${VERSION}-${env.BUILD_NUMBER}"
          echo "Image tag: ${IMAGE_TAG}"
        }
      }
    }

stage("Angular Build") {
  steps {
    sh '''
      export HOME=/var/lib/jenkins
      source $HOME/.bashrc

      node -v
      npm -v

      cd frontend/web-ui
      npm install
      npm run build --prod
    '''
  }
}

    stage("Docker Build") {
      steps {
        sh """
          docker build -t angular-app:${IMAGE_TAG} .
          docker tag angular-app:${IMAGE_TAG} ${ECR_REPO}:${IMAGE_TAG}
        """
      }
    }

    stage("ECR Login & Push") {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
          sh """
            aws ecr get-login-password --region ${AWS_REGION} \
            | docker login --username AWS --password-stdin ${ECR_REPO}
            docker push ${ECR_REPO}:${IMAGE_TAG}
          """
        }
      }
    }

    stage("Update GitOps Repo") {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'gitops-creds',
          usernameVariable: 'GIT_USER',
          passwordVariable: 'GIT_PASS'
        )]) {
          sh """
            rm -rf gitops
            git clone https://${GIT_USER}:${GIT_PASS}@github.com/AnadictMathew/anadictdevops-gitops.git gitops
            cd gitops/environments/prod
            sed -i 's/tag:.*/tag: "${IMAGE_TAG}"/' values.yaml
            git add .
            git commit -m "update angular-app image ${IMAGE_TAG}"
            git push origin main
          """
        }
      }
    }
  }
}

