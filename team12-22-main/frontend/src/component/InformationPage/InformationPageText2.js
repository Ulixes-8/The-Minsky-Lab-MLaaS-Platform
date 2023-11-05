import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/InformationPage.css';

function InformationPage() {
  const navigate = useNavigate();
  const Button = ({ onClick, className }) => (
      <div className="fancy" href="#" onClick={onClick} id="to-hyperparameter-tuning-frominformationpage">
          <span className="top-key"></span>
          <span className="text">Build a Neural Network</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
      </div>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
<div className="InfoText">
  <div className="heading">
  <h1>WHAT IS A NEURAL NETWORK?</h1>
        <p>
        Neural networks are computer systems inspired by the human brain. 
        They learn from data to recognize patterns and make decisions. 
        Networks have layers of connected nodes called neurons. 
        By adjusting the connections between neurons, networks improve their performance. 
        They are widely used for tasks like image recognition, language translation, and predictive analysis.
        </p>
  </div>
      <div className="subHeading">
        <h2>HOW DOES A NEURAL NETWORK WORK?</h2>
        <div className="block">
          <h3>1. Activation Function</h3> 
          <p>
          Activation functions are like switches in a neural network that decide if a neuron should "fire" or not. 
          They help the network understand different patterns. Some popular ones are ReLU, sigmoid, and tanh. 
          These switches make networks smarter by handling complex information. Without them, networks could only understand simple relationships.
          </p>
        </div>
        <div className="block">
          <h3>2. Learning Rate</h3>
          <p>
          Learning rate is a crucial setting in training neural networks. 
          It controls how much the network changes based on new data. 
          A small learning rate makes slow, careful adjustments, while a large one makes bigger, faster changes. 
          Picking the right learning rate helps the network learn effectively without overshooting the best solution.
          </p>
        </div>
        <div className="block">
          <h3>3. Hidden Layers and Number of Neurons</h3>
          <p>
          Hidden layers are the middle part of neural networks, between input and output layers. 
          They contain neurons that help process and understand data. 
          The number of neurons in a hidden layer affects the network's capacity to learn complex patterns. 
          More neurons can capture richer information, but may take longer to train and risk overfitting. 
          Choosing the right balance helps create efficient and accurate networks.
          </p>
        </div>
        <div className="block">
          <h3>4. Solver</h3>
          <p>
            An optimizer in a neural network is an algorithm that is used to
            update the weights of the network during training in order to
            minimize the loss function. The loss function measures how well the
            network is performing on a given task. Optimizers use different
            strategies, such as stochastic gradient descent (SGD), Adam, and
            RMSprop, to update the weights and improve the performance of the
            network. The choice of optimizer can have a significant impact on
            the training process and the final performance of the network.
          </p>
        </div>
      </div>
      <div className="info-button">
        <Button onClick={() => navigate("/hyperparameter-tuning")} />
      </div>
      </div>
  );
}

      
export default InformationPage;
