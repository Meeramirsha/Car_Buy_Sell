import pandas as pd
import pickle
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import os

# Ensure we are in the right directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

def train_model():
    print("Loading dataset...")
    df = pd.read_csv('car_data.csv')

    # Features: brand, year, mileage, fuel_type
    # Target: price
    X = df[['brand', 'year', 'mileage', 'fuel_type']]
    y = df['price']

    print("Training model (Linear Regression)...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    print(f"Model trained with accuracy (R2): {score:.2f}")

    # Save the model
    with open('car_price_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    print("Model saved to car_price_model.pkl")

if __name__ == "__main__":
    train_model()
