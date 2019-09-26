import numbers

from neat import identifiable


class Node(identifiable.Identifiable):
    __id = 0

    def __init__(self, value: numbers.Number = 0):
        self.__value = value

        Node.__id += 1
        self.__current_id = Node.__id

    def get(self) -> numbers.Number:
        return self.__value

    def set(self, value: numbers.Number) -> bool:
        if not isinstance(value, numbers.Number):
            return False

        self.__value = value
        return True

    def get_id(self) -> int:
        return self.__current_id

    @staticmethod
    def get_last_id() -> int:
        return Node.__id
