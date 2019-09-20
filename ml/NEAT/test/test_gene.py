import unittest
import numpy as np

from neat import node, gene


class TestGene(unittest.TestCase):

    def test_in_and_out_node_should_be_different(self):
        dummy_gene = gene.Gene(node.Node(), node.Node())

        in_node, out_node = dummy_gene.get_in_out_nodes()
        self.assertNotEqual(in_node.get_id(), out_node.get_id())

    def test_expect_to_fail_if_in_and_out_nodes_are_the_same(self):
        dummy_node = node.Node()
        with self.assertRaises(Exception):
            gene.Gene(dummy_node, dummy_node)

    def test_gene_by_default_has_status_enabled(self):
        dummy_gene = gene.Gene(node.Node(), node.Node())

        self.assertTrue(dummy_gene.get_status())

    def test_weight_is_in_interval_for_100_genes(self):

        for index in range(0, 100):
            gene_weight = gene.Gene(node.Node(), node.Node()).get_weight()

            self.assertGreaterEqual(gene_weight, 0)
            self.assertLess(gene_weight, 1)









