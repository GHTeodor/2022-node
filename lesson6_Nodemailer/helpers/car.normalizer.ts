class CarNormalizer {
    model(model: string): string {
        return model.trim().charAt(0).toUpperCase() + model.trim().substring(1);
    }
}

export const carNormalizer = new CarNormalizer()
