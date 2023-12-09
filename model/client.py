import tensorflow as tf
from tensorflow.keras import datasets, layers, models
import requests
import json
from colorama import Fore, Style

class AccuracyOnlyCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        print(f"Accuracy: {logs['accuracy']:.4f}")

def send_final(final_weights_json):
    server_endpoint = "http://192.168.206.90/api/v1/FinalParams/"
    response = requests.post(server_endpoint, json={"final_weights": final_weights_json})
    if response.status_code == 200:
        print(f"{Fore.GREEN}Final weights sent to server successfully.{Style.RESET_ALL}")
    else:
        print(f"{Fore.RED}Failed to send final weights to server. Status code: {response.status_code}{Style.RESET_ALL}")

(train_images, train_labels), (_, _) = datasets.cifar10.load_data()
train_images, train_labels = train_images / 255.0, train_labels.flatten()

clients_data = [(train_images[i::5], train_labels[i::5]) for i in range(5)]

model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Flatten())
model.add(layers.Dense(10, activation='softmax'))
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

accuracy_callback = AccuracyOnlyCallback()

for epoch in range(2):
    print(f"\n{Fore.GREEN}Currently at Epoch {epoch + 1}/{2}{Style.RESET_ALL}")
    
    for client_id, (client_images, client_labels) in enumerate(clients_data):
        print(f"\n{Fore.RED} Starting training, operation in progress {client_id + 1}/{5}{Style.RESET_ALL}")
        model.fit(client_images, client_labels, epochs=1, verbose=2)  
    
        updated_weights = model.get_weights()
        updated_weights = [w.tolist() for w in updated_weights]
        response = requests.post("http://192.168.206.90/api/v1/model/", json={"client_id": client_id, "updated_weights": updated_weights})
        print(f"{Fore.YELLOW}Server response for Client {client_id + 1}/{5}: {response.text}{Style.RESET_ALL}")

    if response.status_code == 200:
        received_weights = response.json()
        r_weights = requests.get("http://192.168.206.90/api/v1/newParams/")
        model.set_weights([tf.constant(w) for w in received_weights])
        print(f"\n{Fore.RED}Continuing training {client_id + 1}/{5} with updated weights{Style.RESET_ALL}")
        model.fit(client_images, client_labels, epochs=1, verbose=2)

final_weights = model.get_weights()
final_weights_json = [w.tolist() for w in final_weights]

with open('final_weights.json', 'w') as json_file:
    json.dump(final_weights_json, json_file)

server_endpoint = "http://localhost:6969/api/v1/FinalParams/"
response = requests.post(server_endpoint, json={"final_weights": final_weights_json})
if response.status_code == 200:
    print(f"{Fore.GREEN}Final weights sent to server successfully.{Style.RESET_ALL}")
else:
    print(f"{Fore.RED}Failed to send final weights to server. Status code: {response.status_code}{Style.RESET_ALL}")
