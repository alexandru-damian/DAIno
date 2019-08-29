import numbers


class Node:
    def __init__(self, value=0):
        self.__value = value

    def get(self):
        return self.__value

    def set(self, value):
        if not isinstance(value, numbers.Number):
            return False

        self.__value = value
        return True
