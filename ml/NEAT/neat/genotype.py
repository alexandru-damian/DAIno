from neat import connection as conn
from neat import node


class Genotype:
    class RefCounter:
        def __init__(self):
            self.__counter: int = 1

        def increment(self):
            self.__counter += 1

        def decrement(self):
            if self.__counter > 0:
                self.__counter -= 1

        def get_counter(self) -> int:
            return self.__counter

    def __init__(self):
        self.__nodes = dict()
        self.__genomes = set()

    def add(self, genome: conn.Connection):
        self.__genomes.add(genome)

        # unpack tuple into separated arguments
        self.__add_node(genome.get_in_out_nodes())

    def remove(self, genome: conn.Connection):
        self.__genomes.remove(genome)
        self.__remove_node(genome.get_in_out_nodes())

    def __add_node(self, nodes: [int, int]):
        for elem in nodes:
            ref_counter = self.__nodes.get(elem)

            if ref_counter is None:
                self.__nodes[elem] = Genotype.RefCounter()
            else:
                self.__nodes[elem].increment()

    def __remove_node(self, nodes: [int, int]) -> bool:

        status = False

        for elem in nodes:
            node_ref_counter: Genotype.RefCounter = self.__nodes.get(elem)

            node_ref_counter.decrement()
            if node_ref_counter.get_counter() is 0:
                del self.__nodes[elem]
                status = True
        return status

    def get_nodes(self):
        return self.__nodes
