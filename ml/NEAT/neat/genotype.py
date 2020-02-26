from neat import connection as conn


class Genotype:

    def __init__(self):

        self.__nodes = dict()
        self.__genomes = set()

    def add(self, genome: conn.Connection):
        self.__genomes.add(genome)

    def remove(self, genome: conn.Connection):
        self.__genomes.remove(genome)

    def update(self, genome: conn.Connection):
        self.__genomes.remove(genome)
        self.__genomes.add(genome)

#    def __update_nodes(self, genome : conn.Connection):



