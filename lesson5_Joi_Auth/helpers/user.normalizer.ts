class UserNormalizer {
    name(name: string): string {
        return name.trim().charAt(0).toUpperCase() + name.trim().substring(1);
    }

    email(email: string): string {
        return email.trim().toLowerCase();
    }
}

export const userNormalizer = new UserNormalizer()
