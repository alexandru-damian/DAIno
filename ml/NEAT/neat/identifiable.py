import abc


class Identifiable(abc.ABC):

    @staticmethod
    @abc.abstractmethod
    def get_last_id() -> int:
        pass

    @abc.abstractmethod
    def get_id(self) -> int:
        pass
