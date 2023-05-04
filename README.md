# Vox-iq: A Voice-Enabled ChatGPT Interface

Vox-iq is an innovative application that allows users to interact with OpenAI's ChatGPT using a voice interface. By combining the power of natural language processing with the convenience of voice commands, Vox-iq provides an intuitive and accessible means of communicating with AI models. Users can ask questions, receive answers, and engage in dynamic conversations with ChatGPT, all through a seamless and user-friendly interface.

## Features

- Voice-based interaction with ChatGPT
- User-friendly interface for real-time conversations with AI
- Powered by OpenAI's state-of-the-art natural language processing technology
- Versatile and adaptable to a wide range of use cases and applications

## Getting Started

Follow the setup instructions provided in this file to configure and launch the Vox-iq application on your local device. Once set up, you can start exploring the potential of voice-activated AI conversations and discover the many ways in which ChatGPT can enhance your communication and information-gathering experiences.

Whether you're looking to engage in casual conversations, get answers to complex questions, or explore the capabilities of AI-powered language models, Vox-iq offers a simple and effective way to dive into the world of conversational AI.

## Setup Instructions

To get started, you will need to clone the repository:

```
git clone https://github.com/altarrok/vox-iq.git
```

Navigate to the project directory:

```
cd vox-iq
```

Install the required dependencies:

```
yarn install
```

### Setting up `vocal-api`

1. Navigate to the `vocal-api` directory:

   ```
   cd apps/vocal-api
   ```

2. Create a `.env` file to store the environment variables:

   ```
   touch .env
   ```

3. Open the `.env` file and add the following environment variables:

   ```
   PORT=<your_desired_port>
   OPENAI_API_KEY=<your_openai_api_key>
   ```

4. Start the development server:

   ```
   yarn dev
   ```

5. Build the application:

   ```
   yarn build
   ```

6. Run the production build:

   ```
   yarn start
   ```

### Setting up `vocal-ui`

1. Navigate to the `vocal-ui` directory:

   ```
   cd apps/vocal-ui
   ```

2. Install the Expo CLI if you don't have it already:

   ```
   npm install -g expo-cli
   ```

3. Start the Expo development server:

   ```
   expo start
   ```

4. Install the Expo Go app on your mobile device or use an Android/iOS emulator to test the application. Scan the QR code provided by the Expo CLI or follow the on-screen instructions to open the app on your device.

That's it! You have now set up both the `vocal-api` and `vocal-ui` applications. You can interact with the ChatGPT AI model through the user interface provided by the `vocal-ui` application, which communicates with the `vocal-api` server.
