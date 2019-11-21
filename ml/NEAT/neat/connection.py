from neat import node, gene
import numpy as np


class Connection(gene.Gene):

    __id = 0

    def __init__(self, in_node_id: int, out_node_id: int, status: bool = True):

        if in_node_id == out_node_id:
            raise Exception('In and out node must be different')

        self.__in_node_id = in_node_id
        self.__out_node_id = out_node_id

        self.__status = status
        self.__weight = np.random.rand(1)

        Connection.__id += 1
        self.__current_id = Connection.__id

    def get_in_out_nodes(self) -> [int, int]:
        return self.__in_node_id, self.__out_node_id

    def get_status(self) -> bool:
        return self.__status

    def get_weight(self) -> float:
        return self.__weight

    def get_id(self) -> int:
        return self.__current_id

    @staticmethod
    def get_last_id() -> int:
        return Connection.__id
