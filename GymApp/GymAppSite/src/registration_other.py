from hashlib import sha512

def get_hash(password: str, salt: str):
    hash = sha512((password + sha512(salt.encode()).hexdigest()).encode())
    for i in range(100000):
        hash = sha512((hash.hexdigest() + sha512(salt.encode()).hexdigest()).encode())
    return hash.hexdigest()